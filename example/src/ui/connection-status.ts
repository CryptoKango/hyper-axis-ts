import type { FeedStatus } from '../market-types';
import { requireElement } from './dom';

export class ConnectionStatus {
  readonly #dot = requireElement('status-dot', HTMLSpanElement);
  readonly #label = requireElement('status', HTMLSpanElement);
  readonly #button = requireElement('reconnect-button', HTMLButtonElement);

  public constructor(onReconnect: () => void) {
    this.#button.addEventListener('click', onReconnect);
  }

  public enable(): void {
    this.#button.disabled = false;
  }

  public render(status: FeedStatus): void {
    this.#dot.className = `status-dot ${status}`;
    const labels: Readonly<Record<FeedStatus, string>> = {
      connecting: '连接主网',
      live: '实时数据',
      reconnecting: '正在重连',
      offline: '连接中断',
    };
    this.#label.textContent = labels[status];
  }

  public renderFailure(): void {
    this.#dot.className = 'status-dot offline';
    this.#label.textContent = '初始化失败';
  }
}
