# Fab4m pi sandbox

A sandboxed [pi](https://pi.dev) environment for this repo. The whole `pi`
process runs inside an isolated Linux container that ships **pnpm** and
**Playwright (chromium + its OS dependencies)**, so the model can build, test,
and run browser tests without touching the host system outside the repo.

This follows pi's ["Plain Docker" containerization pattern](https://github.com/earendil-works/pi-coding-agent/blob/main/docs/containerization.md):
the repository is bind-mounted into the container at `/workspace`, so every read
and write inside the sandbox reflects directly on your host files.

## Files

| File | Purpose |
| ---- | ------- |
| `Dockerfile` | Builds the sandbox image (Node 24.4.1, pnpm, Playwright system deps, pi). |
| `run.sh` | Builds (if needed) and runs the container. Forwards model API keys; persists auth/sessions, pnpm store, and browser cache in named volumes. |
| `setup.sh` | One-time in-container setup: `pnpm install` + `playwright install --with-deps chromium`. |

## Quick start

```bash
# from repo root:

# 1) one-time install of workspace deps + chromium browser inside the sandbox
.pi/sandbox/run.sh .pi/sandbox/setup.sh

# 2) start pi in the sandbox
.pi/sandbox/run.sh
```

Authenticate either by exporting a provider API key on the host (it is
forwarded into the container):

```bash
export ANTHROPIC_API_KEY=sk-ant-...
.pi/sandbox/run.sh
```

…or use `/login` inside pi to authenticate via a subscription (the auth is
persisted in the `fab4m-pi-agent` named volume).

## Running arbitrary commands

`run.sh` passes all arguments to the container instead of the default `pi`:

```bash
.pi/sandbox/run.sh bash               # drop into a shell
.pi/sandbox/run.sh pnpm install       # install deps
.pi/sandbox/run.sh pnpm -r run test:unit
```

## What's pre-baked vs. downloaded

- **Pre-baked in the image:** Node 24.4.1, pnpm (corepack), pi, and the Debian
  libraries needed to run headless Chromium.
- **Downloaded at setup time (persisted in volumes):** npm/pnpm workspace
  packages (into the repo's `node_modules`) and the Chromium browser binary
  (`/ms-playwright` volume). Re-running `setup.sh` is mostly a cache hit.

## Volume mapping

| Host name             | Container path      | Contents |
| -------------------- | -------------------- | -------- |
| repo (bind mount)    | `/workspace`         | the repo; writes reflect on host |
| `fab4m-pi-agent`     | `/root/.pi/agent`    | pi settings, sessions, auth (NOT host `~/.pi/agent`) |
| `fab4m-pnpm-store`   | `/pnpm/store`        | pnpm content-addressable store |
| `fab4m-ms-playwright`| `/ms-playwright`     | Chromium browser binaries |

Because `~/.pi/agent` is a per-container volume (not your host profile), you
authenticate separately inside the sandbox. This keeps host credentials out of
the container by default; only the API keys you explicitly export are forwarded
in.

## Rebuilding

The image is built automatically the first time `run.sh` runs. To rebuild
after editing the `Dockerfile`:

```bash
docker image rm fab4m-pi-sandbox
.pi/sandbox/run.sh
```

The build context is the `.pi/sandbox/` directory only, so it stays small.

## Notes

- Node/pnpm versions mirror the repo (`.tool-versions` → nodejs 24.4.1;
  `pnpm-lock.yaml` v9). pnpm is installed via corepack (`pnpm@latest`).
- Playwright is invoked through the workspace (`pnpm exec playwright ...`), so
  the browser version always matches the pinned `@fab4m/*` package versions
  rather than a separately pinned image copy.
- For full-host isolation alternatives (micro-VM keeping auth on the host, or
  policy-controlled remote sandboxes) see pi's containerization docs.