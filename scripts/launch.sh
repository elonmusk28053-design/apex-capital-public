#!/usr/bin/env bash
set -euo pipefail
ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT"
PM='pnpm'
if [ -f pnpm-lock.yaml ]; then PM='pnpm'; fi
case "${1:-dev}" in
  install)
    corepack enable
    corepack prepare pnpm@9.15.1 --activate
    pnpm install --frozen-lockfile
    ;;
  dev)
    pnpm dev
    ;;
  build)
    pnpm build
    ;;
  test)
    pnpm test
    ;;
  *) echo "Usage: $0 [install|dev|build|test]"; exit 2 ;;
esac
