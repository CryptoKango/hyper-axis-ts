#!/usr/bin/env bash
set -euo pipefail

readonly CORE_REPOSITORY="https://github.com/CryptoKango/hyper-axis.git"
readonly CORE_TAG="v0.1.0"
readonly CORE_COMMIT="da335740afba6f4d3ed9848efddc622072e04ab6"
readonly RUST_VERSION="1.99.1"
readonly WASM_BINDGEN_VERSION="0.2.129"

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
core_dir="$repo_dir/.cache/hyper-axis-core-$CORE_TAG"
output_dir="$repo_dir/wasm"

command -v git >/dev/null 2>&1 || {
  echo "git is required" >&2
  exit 1
}
command -v cargo >/dev/null 2>&1 || {
  echo "Rust $RUST_VERSION is required" >&2
  exit 1
}
command -v rustup >/dev/null 2>&1 || {
  echo "rustup is required" >&2
  exit 1
}
command -v wasm-bindgen >/dev/null 2>&1 || {
  echo "wasm-bindgen-cli $WASM_BINDGEN_VERSION is required" >&2
  exit 1
}

actual_bindgen_version="$(wasm-bindgen --version | awk '{print $2}')"
if [[ "$actual_bindgen_version" != "$WASM_BINDGEN_VERSION" ]]; then
  echo "wasm-bindgen-cli $WASM_BINDGEN_VERSION is required; found $actual_bindgen_version" >&2
  exit 1
fi

# A named channel and a pinned version may resolve to the same rustc while
# rustup stores their installed targets separately. Reuse the active toolchain
# only when both the compiler version and wasm target match exactly.
active_toolchain="$(rustup show active-toolchain | awk '{print $1}')"
active_rust_version="$(rustup run "$active_toolchain" rustc --version | awk '{print $2}')"
if [[ "$active_rust_version" == "$RUST_VERSION" ]] && \
  rustup target list --installed --toolchain "$active_toolchain" | \
    grep -qx 'wasm32-unknown-unknown'; then
  export RUSTUP_TOOLCHAIN="$active_toolchain"
fi

if [[ ! -d "$core_dir/.git" ]]; then
  mkdir -p "$(dirname "$core_dir")"
  git clone --branch "$CORE_TAG" --depth 1 "$CORE_REPOSITORY" "$core_dir"
fi

actual_remote="$(git -C "$core_dir" remote get-url origin)"
actual_commit="$(git -C "$core_dir" rev-parse HEAD)"
if [[ "$actual_remote" != "$CORE_REPOSITORY" ]]; then
  echo "Unexpected Rust Core remote: $actual_remote" >&2
  exit 1
fi
if [[ "$actual_commit" != "$CORE_COMMIT" ]]; then
  echo "Rust Core commit mismatch: expected $CORE_COMMIT, found $actual_commit" >&2
  exit 1
fi

"$core_dir/scripts/build-wasm.sh" "$output_dir"

printf 'Built HyperAxis WASM %s (%s) into %s\n' "$CORE_TAG" "$CORE_COMMIT" "$output_dir"
