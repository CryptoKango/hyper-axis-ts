import type {
  HyperAxisCandleInterval,
  HyperAxisClient,
  HyperAxisInfoQuery,
  HyperAxisSubscription,
  JsonValue,
} from '@cryptokango/hyper-axis';

import type {
  AssetContext,
  BboPoint,
  CandlePoint,
  FeedSelection,
  FeedStatus,
  MarketCatalog,
  MarketDefinition,
  OrderBookSnapshot,
  PerpDexDefinition,
} from './market-types';
import {
  parseAssetContextMessage,
  parseAllMidsMessage,
  parseBboMessage,
  parseCandleMessage,
  parseCandleSnapshot,
  parseOrderBookMessage,
  parsePerpDexs,
  parsePerpMarkets,
  parseRwaMarkets,
  parseSpotMarkets,
} from './protocol';

const CONNECT_TIMEOUT_MS = 10_000;
const HEARTBEAT_INTERVAL_MS = 25_000;
const MAX_RECONNECT_DELAY_MS = 15_000;
const CANDLE_LIMIT = 500;

export interface MarketFeedHandlers {
  readonly onStatus: (status: FeedStatus) => void;
  readonly onSnapshot: (candles: readonly CandlePoint[]) => void;
  readonly onCandle: (candle: CandlePoint) => void;
  readonly onBbo: (quote: BboPoint) => void;
  readonly onBook: (book: OrderBookSnapshot) => void;
  readonly onMids: (mids: Readonly<Record<string, number>>) => void;
  readonly onAssetContext: (context: AssetContext) => void;
  readonly onError: (error: unknown) => void;
}

export class HyperliquidMarketFeed implements Disposable {
  readonly #client: HyperAxisClient;
  readonly #handlers: MarketFeedHandlers;
  #selection: FeedSelection | undefined;
  #socket: WebSocket | undefined;
  #connectTimeoutId: number | undefined;
  #heartbeatIntervalId: number | undefined;
  #reconnectTimeoutId: number | undefined;
  #reconnectAttempts = 0;
  #snapshotSequence = 0;
  #rwaDexes: readonly string[] = [];
  #disposed = false;

  public constructor(client: HyperAxisClient, handlers: MarketFeedHandlers) {
    this.#client = client;
    this.#handlers = handlers;
  }

  public async loadMarkets(): Promise<MarketCatalog> {
    const [perpPayload, spotPayload, dexPayload] = await Promise.all([
      this.#queryInfo(
        { type: 'meta', dex: '' },
        (body: string): JsonValue => this.#client.parsePerpMetaResponse(body),
      ),
      this.#queryInfo({ type: 'spotMeta' }),
      this.#queryInfo(
        { type: 'perpDexs' },
        (body: string): JsonValue => this.#client.parsePerpDexsResponse(body),
      ),
    ]);
    const rwaDexes = parsePerpDexs(dexPayload);
    const rwaResults = await Promise.allSettled(
      rwaDexes.map(async (dex: PerpDexDefinition) => ({
        dex,
        payload: await this.#queryInfo(
          { type: 'metaAndAssetCtxs', dex: dex.name },
          (body: string): JsonValue => this.#client.parsePerpMetaAndAssetCtxsResponse(body),
        ),
      })),
    );

    const rwaMarkets: MarketDefinition[] = [];
    const initialContexts: Record<string, AssetContext> = {};
    const loadedDexes: string[] = [];
    for (const result of rwaResults) {
      if (result.status === 'rejected') {
        this.#handlers.onError(result.reason);
        continue;
      }
      const parsed = parseRwaMarkets(result.value.payload, result.value.dex);
      if (parsed.markets.length === 0) continue;
      rwaMarkets.push(...parsed.markets);
      Object.assign(initialContexts, parsed.contexts);
      loadedDexes.push(result.value.dex.name);
    }
    this.#rwaDexes = Object.freeze(loadedDexes);
    return {
      markets: Object.freeze([
        ...parsePerpMarkets(perpPayload),
        ...parseSpotMarkets(spotPayload),
        ...rwaMarkets,
      ]),
      initialContexts: Object.freeze(initialContexts),
      rwaDexes: this.#rwaDexes,
    };
  }

  public async select(selection: FeedSelection): Promise<void> {
    const previous = this.#selection;
    this.#selection = selection;
    const activeSocket = this.#socket;
    if (activeSocket?.readyState === WebSocket.OPEN) {
      if (previous !== undefined) this.#unsubscribe(activeSocket, previous);
      this.#subscribe(activeSocket, selection);
    }
    await this.#loadCandleSnapshot(selection);
  }

  public connect(): void {
    if (this.#disposed || this.#socket !== undefined) return;
    this.#openSocket();
  }

  public reconnectNow(): void {
    if (this.#disposed) return;
    this.#clearReconnectTimer();
    const previousSocket = this.#socket;
    this.#socket = undefined;
    this.#clearSocketTimers();
    previousSocket?.close(1000, 'manual reconnect');
    this.#reconnectAttempts = 0;
    this.#openSocket();
  }

  public [Symbol.dispose](): void {
    this.#disposed = true;
    this.#snapshotSequence += 1;
    this.#clearReconnectTimer();
    this.#clearSocketTimers();
    const activeSocket = this.#socket;
    this.#socket = undefined;
    activeSocket?.close(1000, 'page closed');
  }

  async #loadCandleSnapshot(selection: FeedSelection): Promise<void> {
    const sequence = ++this.#snapshotSequence;
    const now = Date.now();
    const intervalMs = intervalToMilliseconds(selection.interval);
    try {
      const payload = await this.#queryInfo({
        type: 'candleSnapshot',
        coin: selection.market.coin,
        interval: selection.interval,
        startTime: String(now - intervalMs * CANDLE_LIMIT),
        endTime: String(now),
      });
      if (sequence !== this.#snapshotSequence || this.#disposed) return;
      this.#handlers.onSnapshot(parseCandleSnapshot(payload));
    } catch (error: unknown) {
      if (sequence === this.#snapshotSequence) this.#handlers.onError(error);
    }
  }

  async #queryInfo(
    query: HyperAxisInfoQuery,
    validator?: (body: string) => JsonValue,
  ): Promise<JsonValue | null> {
    const request = this.#client.buildTypedInfoHttpRequest('mainnet', query);
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    const responseBody = await response.text();
    const parsed = this.#client.parseHttpResponse(
      request.kind,
      response.status,
      responseBody,
    );
    if (!response.ok) {
      throw new Error(
        parsed.message ?? `Hyperliquid Info 请求失败：HTTP ${String(response.status)}`,
      );
    }
    return validator?.(responseBody) ?? parsed.payload;
  }

  #openSocket(): void {
    this.#handlers.onStatus(this.#reconnectAttempts === 0 ? 'connecting' : 'reconnecting');
    const nextSocket = new WebSocket(this.#client.websocketUrl('mainnet'));
    this.#socket = nextSocket;
    nextSocket.addEventListener('open', this.#handleOpen);
    nextSocket.addEventListener('message', this.#handleMessage);
    nextSocket.addEventListener('close', this.#handleClose);
    nextSocket.addEventListener('error', this.#handleError);
    this.#connectTimeoutId = window.setTimeout(() => {
      if (this.#socket === nextSocket && nextSocket.readyState === WebSocket.CONNECTING) {
        nextSocket.close(4000, 'connect timeout');
      }
    }, CONNECT_TIMEOUT_MS);
  }

  readonly #handleOpen = (event: Event): void => {
    const openedSocket = event.currentTarget;
    if (!(openedSocket instanceof WebSocket) || openedSocket !== this.#socket) return;
    this.#clearConnectTimeout();
    this.#reconnectAttempts = 0;
    this.#send(openedSocket, { type: 'allMids' });
    for (const dex of this.#rwaDexes) {
      this.#send(openedSocket, { type: 'allMids', dex });
    }
    if (this.#selection !== undefined) this.#subscribe(openedSocket, this.#selection);
    this.#startHeartbeat(openedSocket);
    this.#handlers.onStatus('live');
  };

  readonly #handleMessage = (event: MessageEvent<unknown>): void => {
    if (typeof event.data !== 'string') return;
    try {
      const message = this.#client.parseWebSocketMessage(event.data);
      const selectedCoin = this.#selection?.market.coin;
      const bbo = parseBboMessage(message);
      if (bbo !== null && bbo.coin === selectedCoin) {
        this.#handlers.onBbo(bbo.value);
      }
      const candle = parseCandleMessage(message);
      if (candle !== null && candle.coin === selectedCoin) {
        this.#handlers.onCandle(candle.value);
      }
      const book = parseOrderBookMessage(message);
      if (book !== null && book.coin === selectedCoin) {
        this.#handlers.onBook(book.value);
      }
      const mids = parseAllMidsMessage(message);
      if (mids !== null) this.#handlers.onMids(mids);
      const context = parseAssetContextMessage(message);
      if (context !== null && context.coin === selectedCoin) {
        this.#handlers.onAssetContext(context.value);
      }
    } catch (error: unknown) {
      this.#handlers.onError(error);
    }
  };

  readonly #handleClose = (event: CloseEvent): void => {
    if (event.currentTarget !== this.#socket) return;
    this.#socket = undefined;
    this.#clearSocketTimers();
    if (this.#disposed) return;
    this.#handlers.onStatus('offline');
    this.#scheduleReconnect();
  };

  readonly #handleError = (): void => {
    this.#handlers.onError(new Error('WebSocket 连接发生错误，正在等待重连。'));
  };

  #subscribe(socket: WebSocket, selection: FeedSelection): void {
    this.#send(socket, {
      type: 'candle',
      coin: selection.market.coin,
      interval: selection.interval,
    });
    this.#send(socket, { type: 'bbo', coin: selection.market.coin });
    this.#send(socket, { type: 'l2Book', coin: selection.market.coin });
    this.#send(socket, { type: 'activeAssetCtx', coin: selection.market.coin });
  }

  #unsubscribe(socket: WebSocket, selection: FeedSelection): void {
    const subscriptions: readonly HyperAxisSubscription[] = [
      { type: 'candle', coin: selection.market.coin, interval: selection.interval },
      { type: 'bbo', coin: selection.market.coin },
      { type: 'l2Book', coin: selection.market.coin },
      { type: 'activeAssetCtx', coin: selection.market.coin },
    ];
    for (const subscription of subscriptions) {
      socket.send(this.#client.websocketUnsubscribe(subscription));
    }
  }

  #send(socket: WebSocket, subscription: HyperAxisSubscription): void {
    socket.send(this.#client.websocketSubscribe(subscription));
  }

  #scheduleReconnect(): void {
    this.#clearReconnectTimer();
    const delay = Math.min(1_000 * 2 ** this.#reconnectAttempts, MAX_RECONNECT_DELAY_MS);
    this.#reconnectAttempts += 1;
    this.#handlers.onStatus('reconnecting');
    this.#reconnectTimeoutId = window.setTimeout(() => {
      this.#reconnectTimeoutId = undefined;
      if (!this.#disposed) this.#openSocket();
    }, delay);
  }

  #startHeartbeat(socket: WebSocket): void {
    this.#clearHeartbeat();
    this.#heartbeatIntervalId = window.setInterval(() => {
      if (this.#socket === socket && socket.readyState === WebSocket.OPEN) {
        socket.send(this.#client.websocketPing());
      }
    }, HEARTBEAT_INTERVAL_MS);
  }

  #clearConnectTimeout(): void {
    if (this.#connectTimeoutId === undefined) return;
    window.clearTimeout(this.#connectTimeoutId);
    this.#connectTimeoutId = undefined;
  }

  #clearHeartbeat(): void {
    if (this.#heartbeatIntervalId === undefined) return;
    window.clearInterval(this.#heartbeatIntervalId);
    this.#heartbeatIntervalId = undefined;
  }

  #clearReconnectTimer(): void {
    if (this.#reconnectTimeoutId === undefined) return;
    window.clearTimeout(this.#reconnectTimeoutId);
    this.#reconnectTimeoutId = undefined;
  }

  #clearSocketTimers(): void {
    this.#clearConnectTimeout();
    this.#clearHeartbeat();
  }
}

function intervalToMilliseconds(interval: HyperAxisCandleInterval): number {
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const values: Readonly<Record<HyperAxisCandleInterval, number>> = {
    '1m': minute,
    '3m': 3 * minute,
    '5m': 5 * minute,
    '15m': 15 * minute,
    '30m': 30 * minute,
    '1h': hour,
    '2h': 2 * hour,
    '4h': 4 * hour,
    '8h': 8 * hour,
    '12h': 12 * hour,
    '1d': day,
    '3d': 3 * day,
    '1w': 7 * day,
    '1M': 30 * day,
  };
  return values[interval];
}
