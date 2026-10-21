# AGENTS.md

本文档是 `hyper-axis-ts` 的工程约定。所有开发者与自动化 Agent 修改代码前必须遵守。

## 1. 仓库职责

- 提供浏览器、Web Worker 与现代 Node.js 可用的 TypeScript SDK。
- 通过 `hyper-axis-wasm` 调用 Rust Core，不在 TypeScript 中重复实现哈希、签名、精度或协议编码。
- 私钥、助记词和签名实现属于宿主钱包，不进入本 SDK。

## 2. 目录与依赖方向

```text
src/index.ts             # 唯一公共入口
src/client/              # 稳定应用门面
src/models/              # 公共不可变类型与 wire model
src/runtime/             # Nonce、日志等运行时封装
src/transport/           # HTTP/WebSocket 协议描述，不直接持有业务密钥
src/wasm/                # WASM 类型边界与加载器
test/                    # 单元、协议和回归测试
tool/                    # 固定版本 WASM 构建与发布校验脚本
wasm/                    # 构建生成的 wasm-bindgen 产物，不手工修改
```

依赖方向只能从 `client` 指向 `models/runtime/transport/wasm`；`models` 不得依赖 WASM
生成代码。应用只从包根入口导入，禁止依赖 `src/**`。

## 3. 精度与协议

- 金额、价格、数量、费率、nonce、OID 和时间戳跨边界统一使用十进制字符串。
- 禁止使用 `number` 承载 64 位协议整数；`number` 只用于 Rust 明确声明的 `u8/u16/u32`。
- Prepared JSON 是 Rust 生成的完整性令牌；除读取公开摘要外，必须原样传回匹配的 finalize API。
- JSON 字段、大小写、数组顺序与空值以固定版本 Rust WASM 为唯一事实来源。

## 4. WASM 与版本

- Rust Core 固定 Git tag、commit、Rust toolchain 和 `wasm-bindgen` 版本，禁止跟随 `master`。
- `src/wasm/bindings.ts` 只描述已封装的稳定子集；生成的 `wasm/*.js/.d.ts/.wasm` 禁止手改。
- 初始化必须幂等，并在首次使用前校验 Rust protocol version。
- WASM 异常统一转换为 `HyperAxisError`，禁止把 `JsError` 泄漏到应用层。

## 5. 安全与日志

- 禁止记录私钥、助记词、签名、地址、nonce、价格、数量和完整请求/响应体。
- 日志默认关闭，只暴露 Rust Core 已脱敏的结构化日志。
- SDK 不内置私钥签名器；只接收宿主钱包返回的 recoverable signature。

## 6. 代码质量

- TypeScript 使用 `strict`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes`。
- 禁止 `any`、非必要类型断言、未校验的 `JSON.parse` 结果和浮点协议计算。
- 公共 API 必须有 TSDoc；破坏性变更提升主版本。
- 文件保持单一职责，自动生成文件与手写代码严格隔离。

## 7. 测试与提交

- 门面、JSON 解码、错误映射、版本兼容、nonce、日志和 transport 必须测试。
- 测试不得使用真实私钥、真实账户或线上下单。
- 提交前运行 `npm run check`；使用 Conventional Commits。
- 默认稳定分支为 `master`。

