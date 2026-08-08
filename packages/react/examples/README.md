# Fab4m React examples (widget testbed)

A small Vite + React app for visualizing the widgets and form features shipped
with `@fab4m/react`. It mirrors the testbed in `packages/svelte`.

## Running

From this package directory:

```bash
pnpm dev
```

Then open the printed URL (default `http://localhost:5173`).

## What's in here

| Route            | Shows                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/simple`        | Basic form with text, email, number and textarea fields                                                                        |
| `/validation`    | Validators: length, range, allowed/disallowed values                                                                           |
| `/multipage`     | Page breaks with previous/next navigation                                                                                      |
| `/conditional`   | Rule engine: fields that show/hide based on other fields                                                                       |
| `/group`         | Group, fieldset, horizontal and nested groups                                                                                  |
| `/widgets`       | Every built-in widget side by side (select, radios, dates, password, file, multiple/table/tags, hidden, content, details, ...) |
| `/stateful`      | `StatefulFormView` with live data tracking                                                                                     |
| `/custom-widget` | Custom widgets via `customWidget()` (rating + toggle)                                                                          |

The examples import the renderer directly from `../src/index`, so changes to
the library source are picked up immediately (HMR).

A **theme switcher** in the sidebar toggles between the `basic` and
`tailwind` themes for all example forms. The basic theme stylesheet
(`@fab4m/fab4m/css/basic/basic.css`) is loaded from the fab4m package;
tailwind utilities are generated from `tailwind.css` (see the `@source`
directive there) via the `@tailwindcss/vite` plugin.

## Commands

- `pnpm dev` – start the dev server
- `pnpm build:examples` – production build (outputs to `examples/dist`)
- `pnpm preview` – preview the production build
- `pnpm typecheck:examples` – typecheck the examples (see `tsconfig.examples.json`)
