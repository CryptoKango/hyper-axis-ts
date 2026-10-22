# 浏览器实时行情 Example

该示例通过 GitHub `master` 分支依赖 `hyper-axis-ts`，展示 Hyperliquid
原生现货、永续合约与 HIP-3 RWA 行情，并提供实时 K 线、L2 盘口和订单预处理。

## 运行

```bash
cd example
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

页面使用 Hyperliquid 主网公开行情，但不会读取私钥、签名或提交订单。

## 依赖关系

```text
example 浏览器应用
    ├── GitHub: CryptoKango/hyper-axis-ts#master
    │       ├── dist/     TypeScript 稳定 API
    │       └── wasm/     Rust Core WebAssembly
    └── lightweight-charts 5.2.1
            └── GitHub: tradingview/lightweight-charts
```

消费者只需要 Node.js 22.12+ 和 npm，不需要安装 Rust。发布正式版本后，业务项目应将 `master` 改成不可变 tag：

```json
{
  "dependencies": {
    "@cryptokango/hyper-axis": "github:CryptoKango/hyper-axis-ts#v0.2.0"
  }
}
```

## 实时数据链路

1. 使用 `meta` 与 `spotMeta` 读取原生永续和现货资产。
2. 使用 `perpDexs` 发现 HIP-3 DEX，再按 DEX 请求 `metaAndAssetCtxs`。
3. RWA 只展示经过本地注册表明确分类的符号，未知符号不会被猜测为 RWA。
4. RWA `perpDexs`、`meta` 和 `metaAndAssetCtxs` 响应先经过 Rust Core 校验，再进入 UI。
5. 使用 `candleSnapshot` 拉取最近 500 根历史 K 线，支持官方全部周期：`1m/3m/5m/15m/30m`、`1h/2h/4h/8h/12h`、`1d/3d/1w/1M`。
6. WebSocket 订阅 `candle`、`l2Book`、`activeAssetCtx` 与 `allMids`；RWA 场所分别订阅带 `dex` 的 `allMids`。
7. 切换交易对或周期时先取消旧订阅，再建立新订阅；连接包含 10 秒超时、25 秒心跳和指数退避重连。

## RWA 边界

- RWA 来源于 Hyperliquid HIP-3 部署者 DEX，不是 Hyperliquid 原生现货。
- 示例注册表覆盖股票、商品、指数/ETF、外汇、私募市场与利率类资产；分类仅用于展示。
- 当前 Rust WASM 尚未公开 HIP-3 资产 ID 计算帮助函数，因此 RWA 委托入口保持只读禁用。
- 不在 TypeScript 层复制协议资产 ID 公式；后续由 Rust Core 暴露能力后再开放订单预处理。

Hyperliquid 原生 `candle` 订阅最小周期是 `1m`，不提供秒级历史 K 线。秒级图表需要以 `trades` 逐笔成交在宿主侧聚合，不能与原生历史 K 线混为同一数据源。

## 永续交易边界

永续下单区借鉴 Papertrade 的开仓信息结构：选择做多/做空，输入逐仓保证金和杠杆，实时预览名义价值、委托数量与零权益参考价。实现仍遵循 Hyperliquid 协议：

- 杠杆上限来自当前 Hyperliquid 市场元数据，不使用 Papertrade 的固定高杠杆规则。
- `保证金 × 杠杆 ÷ 限价` 使用 `BigInt` 十进制定点运算，并按市场 `sizeDecimals` 向下量化委托数量。
- 零权益参考价只展示价格反向波动 `1 / leverage` 的数学参考，不包含维持保证金、手续费、账户组合保证金或清算档位，因此不等于 Hyperliquid 清算价。
- 正常开仓由保证金与杠杆推导数量；只减仓切回直接数量输入，最终可减数量仍由账户持仓决定。
- 最终订单仍是 Hyperliquid `LIMIT / GTC`，资产 ID、精度校验、Action 编码和签名摘要全部交给 Rust Core。

Papertrade 的 LP 对手方、无订单簿即时成交、PAPER 铸造、盈利冲击费和硬清算属于其自身合约业务，本示例没有复制或伪装这些链上规则。

## K 线库

K 线使用 TradingView 官方开源项目 [lightweight-charts](https://github.com/tradingview/lightweight-charts)，版本 `5.2.1`，许可证为 Apache-2.0。页面支持在蜡烛 K 线和实时阶梯面积趋势图之间切换：K 线使用 candle 快照与增量，趋势图独立订阅所选市场的 Hyperliquid BBO，并展示买一/卖一中间价。

实时趋势图按 `125ms` 时间桶去重，丢弃乱序报价，只保留最近 5 分钟的观测点；渲染由 `requestAnimationFrame` 驱动并限制为 10 FPS。横轴使用最近一次服务端时间与单调时钟估算持续前进，尾部仅延续最后一个真实 BBO 中间价，不插值或伪造价格。

图内 `attributionLogo` 已关闭；页面图表页脚保留 Lightweight Charts NOTICE 文本和 TradingView 链接，以继续满足归属要求。

## UI 主题

主题令牌集中在 `src/theme.css`，组件不得新增无语义的品牌色硬编码：

- `--color-brand-primary`：Kango 橙，用于品牌标识、主入口、焦点和关键选中状态。
- `--color-brand-secondary`：辅助紫，用于协议、开发者能力等次级强调。
- `--color-accent-*`：粉、黄、RWA 桃色和信息蓝，只承担复古漫画装饰或市场分类。
- `--color-long*` / `--color-short*`：只用于多空、涨跌、盘口和 K 线，不承担品牌装饰。
- `--color-surface-*` / `--color-text-*` / `--color-border*`：页面、卡片、控件和文字基础色。

TradingView Lightweight Charts 在运行时读取同一组 CSS 主题令牌，避免 K 线颜色与页面交易语义分叉。

## 安全边界

- 页面不读取、保存或传输私钥和助记词。
- “生成签名摘要”只调用 Rust Core 构造并校验订单，不调用交易接口。
- 订单签名与广播必须由经过安全评审的钱包适配器完成。
- 页面显示的保证金、杠杆和风险价格是开仓规划数据，不替代交易所返回的真实账户风险数据。
