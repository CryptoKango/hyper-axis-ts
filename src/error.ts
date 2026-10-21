/** Stable SDK error categories. */
export type HyperAxisErrorCode =
  | 'bridgeFailure'
  | 'incompatibleVersion'
  | 'initialization'
  | 'invalidArgument'
  | 'invalidResponse';

/** Typed error emitted by all HyperAxis TypeScript public boundaries. */
export class HyperAxisError extends Error {
  public readonly code: HyperAxisErrorCode;
  public readonly operation: string;

  public constructor(options: {
    readonly code: HyperAxisErrorCode;
    readonly message: string;
    readonly operation: string;
    readonly cause?: unknown;
  }) {
    super(options.message, { cause: options.cause });
    this.name = 'HyperAxisError';
    this.code = options.code;
    this.operation = options.operation;
  }
}

