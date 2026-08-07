#!/usr/bin/env bash
# Build and run the fab4m pi sandbox.
#
# Bind-mounts the repo at /workspace and persists pi auth/sessions, the pnpm
# store, and the Playwright browser cache in named volumes so they survive
# container recreation. Forwards model provider API keys from the host env.
#
# Usage:
#   .pi/sandbox/run.sh            # start pi in the sandbox
#   .pi/sandbox/run.sh bash        # drop into a shell in the sandbox
#   .pi/sandbox/run.sh pnpm install  # run any command instead of pi
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
IMAGE="${FAB4M_PI_IMAGE:-fab4m-pi-sandbox}"

run_args=("$@")

# Build (cached) if the image is missing. To force a rebuild when the
# Dockerfile changes, delete the image first:  docker image rm $IMAGE
if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  echo ">> Building image $IMAGE from $SCRIPT_DIR/Dockerfile"
  docker build -t "$IMAGE" "$SCRIPT_DIR"
fi

# Forward supported AI provider keys / pi flags that are set on the host.
env_args=()
for v in ANTHROPIC_API_KEY OPENAI_API_KEY GOOGLE_API_KEY \
         AZURE_OPENAI_API_KEY DEEPSEEK_API_KEY GROQ_API_KEY \
         OPENROUTER_API_KEY XAI_API_KEY MISTRAL_API_KEY \
         FIREWORKS_API_KEY TOGETHER_API_KEY HF_TOKEN \
         PI_OFFLINE PI_SKIP_VERSION_CHECK PI_TELEMETRY; do
  if [[ -n "${!v:-}" ]]; then
    env_args+=("-e" "$v=${!v}")
  fi
done

exec docker run --rm -it \
  "${env_args[@]}" \
  -v "$REPO_ROOT:/workspace" \
  -v fab4m-pi-agent:/root/.pi/agent \
  -v fab4m-pnpm-store:/pnpm/store \
  -v fab4m-ms-playwright:/ms-playwright \
  -w /workspace \
  "$IMAGE" \
  "${run_args[@]}"