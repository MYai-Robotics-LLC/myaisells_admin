#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .env.local ] && grep -q '^NODE_AUTH_TOKEN=' .env.local; then
  export NODE_AUTH_TOKEN=$(grep '^NODE_AUTH_TOKEN=' .env.local | cut -d '=' -f2-)
fi

if [ -z "${NODE_AUTH_TOKEN:-}" ]; then
  echo "NODE_AUTH_TOKEN is not set. Add it to .env.local (see .npmrc) before installing." >&2
  exit 1
fi

exec pnpm install "$@"
