#!/usr/bin/env bash
# One-time setup inside a fresh sandbox container.
#
#   .pi/sandbox/run.sh .pi/sandbox/setup.sh
#
# Installs workspace dependencies with pnpm and downloads the chromium browser
# (with any version-specific OS deps) so the first Playwright run is fast.
# Results persist in the named volumes defined in run.sh (pnpm store, browser
# cache) and in the bind-mounted repo's node_modules.
set -euo pipefail

echo ">> pnpm install"
pnpm install

echo ">> playwright: install chromium (with deps)"
pnpm exec playwright install --with-deps chromium

echo
echo "Sandbox setup complete. Start pi with: .pi/sandbox/run.sh"