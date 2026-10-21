import {
  HyperAxisClient,
  HyperAxisError,
  createHyperAxisWasmLoader,
} from '@cryptokango/hyper-axis';

import './style.css';

const output = requireElement('output', HTMLPreElement);
const status = requireElement('status', HTMLSpanElement);
const statusDot = requireElement('status-dot', HTMLSpanElement);
const protocolVersion = requireElement('protocol-version', HTMLSpanElement);
const decimalButton = requireElement('decimal-button', HTMLButtonElement);
const infoButton = requireElement('info-button', HTMLButtonElement);
const websocketButton = requireElement('ws-button', HTMLButtonElement);
const orderButton = requireElement('order-button', HTMLButtonElement);
const logsButton = requireElement('logs-button', HTMLButtonElement);

const loader = createHyperAxisWasmLoader({
  importModule: () => import('@cryptokango/hyper-axis/wasm'),
});
const client = await HyperAxisClient.initialize(loader);
let socket: WebSocket | undefined;

client.configureLogging({ enabled: true, level: 'info', capacity: 200 });
protocolVersion.textContent = `protocol: ${client.protocolVersion}`;
status.textContent = 'WASM 已就绪';
statusDot.classList.add('ready');
setButtonsDisabled(false);
writeOutput('初始化完成', {
  protocolVersion: client.protocolVersion,
  websocketUrl: client.websocketUrl('testnet'),
});

decimalButton.addEventListener('click', handleNormalizeDecimal);
infoButton.addEventListener('click', handleLoadAllMids);
websocketButton.addEventListener('click', handleWebSocketToggle);
orderButton.addEventListener('click', handlePrepareOrder);
logsButton.addEventListener('click', handleReadLogs);
window.addEventListener('beforeunload', closeWebSocket);

function handleNormalizeDecimal(): void {
  runSafely('Decimal 规范化', () => {
    const input = '00123.450000';
    return { input, normalized: client.normalizeDecimal(input) };
  });
}

function handleLoadAllMids(): void {
  runSafelyAsync('allMids 响应', async () => {
    const request = client.buildTypedInfoHttpRequest('testnet', {
      type: 'allMids',
      dex: '',
    });
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return client.parseHttpResponse(
      request.kind,
      response.status,
      await response.text(),
    );
  });
}

function handleWebSocketToggle(): void {
  if (socket !== undefined) {
    closeWebSocket();
    return;
  }

  runSafely('WebSocket', () => {
    const nextSocket = new WebSocket(client.websocketUrl('testnet'));
    socket = nextSocket;
    websocketButton.textContent = '断开 WebSocket';

    nextSocket.addEventListener('open', handleWebSocketOpen);
    nextSocket.addEventListener('message', handleWebSocketMessage);
    nextSocket.addEventListener('close', handleWebSocketClose);
    nextSocket.addEventListener('error', handleWebSocketError);
    return { state: 'connecting' };
  });
}

function handleWebSocketOpen(): void {
  socket?.send(client.websocketSubscribe({ type: 'allMids', dex: '' }));
  writeOutput('WebSocket', { state: 'connected', subscription: 'allMids' });
}

function handleWebSocketMessage(event: MessageEvent<unknown>): void {
  const message = event.data;
  if (typeof message !== 'string') return;
  runSafely('WebSocket 消息', () => client.parseWebSocketMessage(message));
}

function handleWebSocketClose(): void {
  socket = undefined;
  websocketButton.textContent = '连接 WebSocket';
  writeOutput('WebSocket', { state: 'closed' });
}

function handleWebSocketError(): void {
  writeOutput('WebSocket', { state: 'error' });
}

function closeWebSocket(): void {
  const activeSocket = socket;
  socket = undefined;
  activeSocket?.close();
  websocketButton.textContent = '连接 WebSocket';
}

function handlePrepareOrder(): void {
  runSafely('限价单预处理（未签名、未提交）', () => {
    const nonceManager = client.createNonceManager();
    try {
      const prepared = client.prepareLimitOrder({
        network: 'testnet',
        asset: 0,
        marketKind: 'perp',
        sizeDecimals: 5,
        side: 'buy',
        limitPrice: '1000',
        size: '0.001',
        timeInForce: 'Gtc',
        nonce: nonceManager.next(Date.now().toString()),
      });
      return {
        actionHashHex: prepared.actionHashHex,
        signingDigestHex: prepared.signingDigestHex,
        nextStep: '将 signingDigestHex 交给受信任的钱包适配器签名',
      };
    } finally {
      nonceManager.dispose();
    }
  });
}

function handleReadLogs(): void {
  runSafely('SDK 脱敏日志', () => client.snapshotLogs());
}

function runSafely(label: string, operation: () => unknown): void {
  try {
    writeOutput(label, operation());
  } catch (error: unknown) {
    writeError(label, error);
  }
}

function runSafelyAsync(
  label: string,
  operation: () => Promise<unknown>,
): void {
  operation()
    .then((value: unknown) => {
      writeOutput(label, value);
    })
    .catch((error: unknown) => {
      writeError(label, error);
    });
}

function writeError(label: string, error: unknown): void {
  if (error instanceof HyperAxisError) {
    writeOutput(label, {
      error: error.name,
      code: error.code,
      operation: error.operation,
      message: error.message,
    });
    return;
  }
  writeOutput(label, {
    error: error instanceof Error ? error.message : '未知错误',
  });
}

function writeOutput(label: string, value: unknown): void {
  output.textContent = `${label}\n\n${formatValue(value)}`;
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  const serialized = JSON.stringify(value, null, 2);
  return serialized;
}

function setButtonsDisabled(disabled: boolean): void {
  decimalButton.disabled = disabled;
  infoButton.disabled = disabled;
  websocketButton.disabled = disabled;
  orderButton.disabled = disabled;
  logsButton.disabled = disabled;
}

function requireElement<TElement extends HTMLElement>(
  id: string,
  elementType: new () => TElement,
): TElement {
  const element = document.getElementById(id);
  if (!(element instanceof elementType)) {
    throw new Error(`缺少页面元素或元素类型不匹配 #${id}`);
  }
  return element;
}
