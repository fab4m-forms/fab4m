# Fab4m pi sandbox image
#
# Runs the whole `pi` process inside an isolated Linux container that has pnpm
# and Playwright (chromium + its OS dependencies) pre-installed. The repo is
# bind-mounted into /workspace, so file changes inside the sandbox write
# straight back to the host.
#
# See .pi/sandbox/README.md for build/run instructions.
#
# Base image matches the repo's preferred Node version (.tool-versions: nodejs 24.4.1).
FROM node:24.4.1-bookworm-slim

# Keep pnpm out of the bind-mounted workspace so the store survives container
# recreation via a named volume.
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    # Persist downloaded browsers in a named volume, decoupled from the repo.
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# System-level dependencies:
#  - git, ripgrep, bash, ca-certificates, curl: pi runtime + tooling
#  - chromium runtime libraries: pre-baked so the first `playwright install` only
#    has to fetch the browser binary, not apt packages. `playwright install
#    --with-deps` at runtime will fill in any version-specific gaps.
RUN apt-get update && apt-get install -y --no-install-recommends \
        bash \
        ca-certificates \
        curl \
        git \
        ripgrep \
        libnss3 \
        libnspr4 \
        libdbus-1-3 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libdrm2 \
        libxkbcommon0 \
        libxcomposite1 \
        libxdamage1 \
        libxfixes3 \
        libxrandr2 \
        libgbm1 \
        libxext6 \
        libx11-6 \
        libxcb1 \
        libasound2 \
        libatspi2.0-0 \
        libgtk-3-0 \
        libpango-1.0-0 \
        libcairo2 \
        libgdk-pixbuf-2.0-0 \
        fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# pnpm via corepack (matches the repo's pnpm-lock.yaml v9.0 / workspace setup).
RUN corepack enable && corepack prepare pnpm@latest --activate \
    && pnpm config set store-dir /pnpm/store

# pi itself. --ignore-scripts matches the documented install recommendation.
RUN npm install -g --ignore-scripts @earendil-works/pi-coding-agent

WORKDIR /workspace

# `pi` by default; override to run setup commands, e.g.
#   docker run --rm -it <image> bash
#   docker run --rm -it <image> pnpm install
CMD ["pi"]