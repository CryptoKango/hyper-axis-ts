# 浏览器 Example

该示例通过 GitHub `master` 分支依赖 `hyper-axis-ts`：

```json
{
  "dependencies": {
    "@cryptokango/hyper-axis": "github:CryptoKango/hyper-axis-ts#master"
  }
}
```

安装并运行：

```bash
cd example
npm install
npm run dev
```

生产环境发布 `v0.1.0` tag 后，建议改成不可变版本：

```json
{
  "dependencies": {
    "@cryptokango/hyper-axis": "github:CryptoKango/hyper-axis-ts#v0.1.0"
  }
}
```

## 依赖关系

```text
example 浏览器应用
    └── GitHub: CryptoKango/hyper-axis-ts#master
            ├── dist/     TypeScript 稳定 API
            └── wasm/     已构建的 Rust WASM
                    └── 构建来源: CryptoKango/hyper-axis#v0.1.0
```

消费者只需要 Node/npm，不需要安装 Rust。Rust 仅用于 SDK 仓库维护者重新生成 `wasm/`。

## 示例范围

- 初始化 WASM 并校验协议版本。
- Decimal 字符串精度规范化。
- 请求测试网 `allMids`。
- 连接测试网 WebSocket 并订阅 `allMids`。
- 构造测试网限价单的签名摘要，但不签名、不提交。
- 查看 Rust Core 的脱敏内存日志。

订单签名必须接入经过安全评审的钱包适配器。示例不会调用 `eth_sign` 或在浏览器中保存私钥。
