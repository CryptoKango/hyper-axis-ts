# hyper-axis-ts

`hyper-axis-ts` 是 HyperAxis Rust Core 的浏览器 TypeScript SDK。协议编码、精度处理、哈希、签名摘要、签名校验和重试分类均由 Rust WebAssembly 执行；TypeScript 只负责类型安全门面、WASM 生命周期以及与浏览器能力的衔接。

当前版本：

- TypeScript SDK：`0.2.0`
- Rust Core：[`v0.2.0`](https://github.com/CryptoKango/hyper-axis/tree/v0.2.0)
- Rust 固定提交：`d81890f6a76d761530506e5ab9d640502d0cc2cf`

## 架构边界

```text
业务应用
   │
   ├── 钱包签名 / fetch / WebSocket / 持久化（浏览器宿主）
   │
   └── @cryptokango/hyper-axis（TypeScript 稳定 API）
                    │
                    └── hyper-axis-wasm（Rust 协议核心）
```

SDK 不保存私钥，不代替钱包签名，也不在 Rust 内发起网络请求。宿主应用把 Rust 生成的签名摘要交给钱包，随后将签名送回 Rust 校验并生成最终请求。

## 安装与构建

```bash
npm install
npm run build
npm run build:wasm
npm run check
```

`build:wasm` 从 GitHub 克隆固定的 Rust tag，并验证固定 commit；不会依赖相邻目录或开发者机器上的本地 Rust 仓库。

完整浏览器接入可参考 [`example/`](./example/README.md)。

也可以直接依赖 GitHub `master`；仓库提交固定版本的 WASM 生成物，npm 的 `prepare` 生命周期只构建 TypeScript，因此消费端不需要安装 Rust：

```json
{
  "dependencies": {
    "@cryptokango/hyper-axis": "github:CryptoKango/hyper-axis-ts#master"
  }
}
```

## 初始化

```ts
import {
  HyperAxisClient,
  createHyperAxisWasmLoader,
} from '@cryptokango/hyper-axis';

const loader = createHyperAxisWasmLoader({
  importModule: () => import('@cryptokango/hyper-axis/wasm'),
});

const hyperAxis = await HyperAxisClient.initialize(loader);
console.log(hyperAxis.protocolVersion); // 0.2.0
```

同一个 loader 的并发初始化只执行一次。SDK 会拒绝加载协议版本不兼容的 WASM。

## 限价单完整流程

所有金额、价格、nonce 和时间戳都使用十进制字符串，禁止先转成 JavaScript `number`。

```ts
const nonceManager = hyperAxis.createNonceManager();
const nonce = nonceManager.next(Date.now().toString());

const prepared = hyperAxis.prepareLimitOrder({
  network: 'mainnet',
  asset: 0,
  marketKind: 'perp',
  sizeDecimals: 5,
  side: 'buy',
  limitPrice: '3500.25',
  size: '0.01',
  timeInForce: 'Gtc',
  reduceOnly: false,
  nonce,
});

// 交给浏览器钱包签名；钱包返回 r、s、v。
const signature = await wallet.signDigest(prepared.signingDigestHex);

const finalized = hyperAxis.finalizeOrder({
  prepared,
  signature,
  expectedSigner: wallet.address,
});

const request = hyperAxis.buildExchangeHttpRequest(finalized);
const response = await fetch(request.url, {
  method: request.method,
  headers: request.headers,
  body: request.body,
});

const result = hyperAxis.parseHttpResponse(
  request.kind,
  response.status,
  await response.text(),
);

nonceManager.dispose();
```

应用必须持久化每个 signer 的 `nonceManager.lastIssued`。网络失败时，签名交易不能盲目重发，应先使用 `hostFailureRetryAdvice()` 的结果执行查询和对账。

## Info API

```ts
const request = hyperAxis.buildTypedInfoHttpRequest('mainnet', {
  type: 'allMids',
  dex: '',
});

const response = await fetch(request.url, {
  method: request.method,
  headers: request.headers,
  body: request.body,
});

const parsed = hyperAxis.parseHttpResponse(
  request.kind,
  response.status,
  await response.text(),
);
```

HIP-3 / RWA 数据先查询 DEX，再按 DEX 获取市场元数据与上下文。响应校验由
Rust Core 完成，TypeScript 只负责网络传输与应用编排：

```ts
const dexRequest = hyperAxis.buildTypedInfoHttpRequest('mainnet', {
  type: 'perpDexs',
});
const dexResponse = await fetch(dexRequest.url, {
  method: dexRequest.method,
  headers: dexRequest.headers,
  body: dexRequest.body,
});
const dexes = hyperAxis.parsePerpDexsResponse(await dexResponse.text());

const rwaRequest = hyperAxis.buildTypedInfoHttpRequest('mainnet', {
  type: 'metaAndAssetCtxs',
  dex: 'xyz',
});
const rwaResponse = await fetch(rwaRequest.url, {
  method: rwaRequest.method,
  headers: rwaRequest.headers,
  body: rwaRequest.body,
});
const rwaMarkets = hyperAxis.parsePerpMetaAndAssetCtxsResponse(
  await rwaResponse.text(),
);
```

完整的 RWA 场所发现、分类与实时订阅实现见 [`example/`](./example/README.md)。

## WebSocket

TypeScript SDK 生成并校验 WebSocket 消息，连接、重连、心跳定时和订阅恢复由应用的网络层负责。

```ts
const socket = new WebSocket(hyperAxis.websocketUrl('mainnet'));

socket.addEventListener('open', () => {
  socket.send(
    hyperAxis.websocketSubscribe({
      type: 'allMids',
    }),
  );
});

socket.addEventListener('message', (event) => {
  if (typeof event.data !== 'string') return;
  const message = hyperAxis.parseWebSocketMessage(event.data);
  console.log(message);
});

// 由宿主定时器控制发送频率。
socket.send(hyperAxis.websocketPing());
```

## 日志

日志默认关闭，仅保存在 Rust 内存环形缓冲区中。日志内容已经过核心层约束，但应用仍不得写入私钥、助记词或原始签名材料。

```ts
hyperAxis.configureLogging({
  enabled: true,
  level: 'info',
  capacity: 500,
});

const snapshot = hyperAxis.snapshotLogs();
const drained = hyperAxis.drainLogs();
hyperAxis.clearLogs();
```

## 稳定性约定

- 对外业务代码只依赖 `HyperAxisClient` 和公开模型。
- `@cryptokango/hyper-axis/wasm` 是生成物入口，不应直接承载业务编排。
- `prepared.opaqueJson` 与 `finalized.opaqueJson` 必须原样回传，不得重新序列化。
- 新 Rust Core 版本必须先通过兼容测试，再更新版本常量和固定 commit。
