/** Hyperliquid environment used for routing and signature replay protection. */
export type HyperAxisNetwork = 'mainnet' | 'testnet';

/** Recoverable secp256k1 signature returned by a host wallet. */
export interface HyperAxisSignature {
  readonly r: string;
  readonly s: string;
  readonly v: 0 | 1 | 27 | 28;
}

