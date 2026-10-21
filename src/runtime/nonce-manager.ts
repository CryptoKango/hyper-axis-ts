import { HyperAxisError } from '../error.js';
import type { HyperAxisWasmNonceManager } from '../wasm/bindings.js';

/** Signer-local monotonic nonce manager backed by Rust Core. */
export class HyperAxisNonceManager {
  readonly #inner: HyperAxisWasmNonceManager;
  #disposed = false;

  public constructor(inner: HyperAxisWasmNonceManager) {
    this.#inner = inner;
  }

  /** Current high-water mark as an exact decimal string. */
  public get lastIssued(): string | undefined {
    this.#ensureUsable();
    return this.#inner.lastIssued;
  }

  /** Issues the next monotonic nonce for the supplied Unix millisecond string. */
  public next(nowMs: string): string {
    this.#ensureUsable();
    return this.#invoke('nonce.next', () => this.#inner.next(nowMs));
  }

  /** Advances the high-water mark without moving it backwards. */
  public fastForward(lastIssued: string): void {
    this.#ensureUsable();
    this.#invoke('nonce.fastForward', () => {
      this.#inner.fastForward(lastIssued);
    });
  }

  /** Releases the underlying WASM allocation. Safe to call more than once. */
  public dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#inner.free();
  }

  #ensureUsable(): void {
    if (this.#disposed) {
      throw new HyperAxisError({
        code: 'bridgeFailure',
        message: 'HyperAxisNonceManager has been disposed.',
        operation: 'nonce',
      });
    }
  }

  #invoke<T>(operation: string, invoke: () => T): T {
    try {
      return invoke();
    } catch (error: unknown) {
      throw new HyperAxisError({
        code: 'bridgeFailure',
        message: `HyperAxis operation failed: ${operation}.`,
        operation,
        cause: error,
      });
    }
  }
}

