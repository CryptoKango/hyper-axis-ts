/** Severity assigned to sanitized Rust diagnostic records. */
export type HyperAxisLogLevel = 'debug' | 'error' | 'info' | 'trace' | 'warn';

/** Runtime ring-buffer configuration. Logging is disabled by default. */
export interface HyperAxisLoggingConfig {
  readonly enabled?: boolean;
  readonly level?: HyperAxisLogLevel;
  readonly capacity?: number;
}

/** Logging configuration actually applied by Rust Core. */
export interface HyperAxisAppliedLoggingConfig {
  readonly enabled: boolean;
  readonly level: HyperAxisLogLevel;
  readonly capacity: number;
}

/** One sanitized diagnostic record. */
export interface HyperAxisLogRecord {
  readonly sequence: string;
  readonly timestampMs: string;
  readonly level: HyperAxisLogLevel;
  readonly target: string;
  readonly message: string;
}

/** Snapshot or drained batch of sanitized records. */
export interface HyperAxisLogBatch {
  readonly dropped: string;
  readonly records: readonly HyperAxisLogRecord[];
}

