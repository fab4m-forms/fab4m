# AGENTS.md

Guidance for coding agents working in this repository.

## Project overview

- This is the **Fab4m** monorepo (form definition + rendering libraries + specialized packages).
- Package manager: **npm workspaces** (defined in root `package.json`).
- Preferred Node version: **24.4.1** (see `.tool-versions`).
- Most code is TypeScript under `packages/*/src`.

## Repository structure

- `packages/core` → `@fab4m/fab4m` (core form model)
- `packages/react` → `@fab4m/react` (React renderer)
- `packages/date` → date field package
- `packages/password` → password field package
- `packages/autocomplete` → autocomplete field package
- `packages/routerforms` → React Router integration
- `packages/builder` → form builder package
- `fab4m.org-astro` → documentation website (Astro starlight)

Note: `packages/smartflow` exists but is currently not listed in root workspaces. Only touch it when explicitly requested.

Note: `fab4m.org` is legacy and should not be touched.

## Working rules for agents

1. Use pnpm
2. Keep changes focused and minimal.
3. Prefer editing source files in `src/` and tests in `test/`.
4. Do **not** hand-edit generated output (`dist/`, `build/`, `.docusaurus/`, `node_modules/`).
5. Preserve public API compatibility unless a breaking change is explicitly requested.
6. When behavior changes, add or update tests.

## Validation commands

Run from repo root after making changes, for each touched package:

```bash
cd packages/<package>
pnpm exec prettier --check .
pnpm exec eslint
pnpm run test:unit
pnpm run build
```

If TypeScript types/interfaces changed, also run:

```bash
pnpm run typecheck
```

## Dependency/order notes

- Build `packages/core` before building/testing dependent packages.
- `packages/routerforms` tests may require:

```bash
cd packages/routerforms
pnpm exec playwright install
```

- `packages/builder` typically depends on built outputs of:
  - `core`
  - `password`
  - `date`
  - `routerforms`
  - `autocomplete`

## Style conventions

- TypeScript + React/TSX
- ES modules
- Follow existing formatting (double quotes, semicolons)
- Use ESLint + Prettier as source of truth

## Docs site (if needed)

```bash
cd fab4m.org
pnpm run start
pnpm run build
```
