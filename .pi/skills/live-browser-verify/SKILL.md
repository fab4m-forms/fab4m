---
name: live-browser-verify
description: Drive a headless Chromium with Playwright to verify live behavior of a dev/preview server (Astro, Vite, Next, etc.). Use when you need to reproduce a runtime bug in a browser, check client-side hydration, detect page reloads/native form POSTs that shouldn't happen, or assert that clicking/typing produces the right DOM outcome without a full reload.
---

# Live Browser Verification Skill

Verify real browser behavior against a running dev/preview server using a headless
Chromium driven by Playwright. This is the fastest way to confirm things an agent
otherwise has to *guess* about: Did the React/Svelte island hydrate? Did clicking
submit cause a native `POST` + full page reload instead of the JS handler? Did the
result card actually render? Are there uncaught JS errors in the console?

## When to use

Good for:
- Reproducing a user-reported browser bug ("the page reloads when I click X").
- Checking whether a framework island (Astro `client:*`, Next, SvelteKit) actually
  hydrates on the client vs. only rendering as inert server HTML.
- Detecting unwanted native form submissions (`method="post"` POST → reload) when a
  JS `preventDefault()` handler was supposed to run.
- Asserting that an interaction (click, fill, submit) yields the right DOM/text
  **without** a navigation/reload.
- Capturing console errors / pageerrors that only surface at runtime.

Not needed for:
- Pure source/TypeScript reasoning (read the files instead).
- Things you can assert with unit/integration tests (run those first).

## Prerequisites

Playwright's Node module + a Chromium build must be available. In this workspace they
already are (the docs site pulls in `playwright`). The skill scripts auto-discover them.

### If Playwright is missing

```bash
pnpm add -D playwright
pnpm exec playwright install chromium
```

The browser cache lives at `~/.cache/ms-playwright/chromium-*/chrome-linux/chrome`
(Linux). The scripts use Playwright's own launcher, so you don't need the path
manually.

## Workflow

1. **Start the app server** (this repo's docs site example, in the background):
   ```bash
   cd fab4m.org-astro
   nohup pnpm dev > /tmp/dev.log 2>&1 & echo "pid $!"
   # wait for the "Local http://localhost:<port>/" line:
   sleep 30; grep -i "local\|ready" /tmp/dev.log | head
   ```
   Note the port (4321 for Astro dev). Use `astro preview`/`astro build` for
   production parity (note: a stale `pnpm install` cache can break prod builds in
   some sandboxes — dev server is usually sufficient).

2. **Write a drive script** based on `scripts/check-page.mjs` (copy & adapt it to
   your page + interaction). The script:
   - imports Playwright via `createRequire` (works for pnpm workspace symlinks),
   - launches headless Chromium,
   - listens to `console`, `pageerror`, and document-typed `request` events,
   - navigates with `waitUntil: "networkidle"`,
   - performs interactions and asserts outcomes.

3. **Run it**:
   ```bash
   node /path/to/your/check-page.mjs
   ```

4. **Interpret the output** (see Interpretation below).

5. **Stop the server** when done:
   ```bash
   pkill -9 -f astro
   ```

## Script patterns (the important bits)

### Import Playwright robustly (pnpm/bundled)

The CJS interop dance matters under pnpm symlinks and pnpm store layouts. This is
the snippet that works regardless of whether the entry script is ESM or CJS:

```js
// ESM entry (file ends in .mjs)
import { createRequire } from "module";
const require = createRequire(import.meta.url); // resolve from the skill/work dir
// OR anchor to the project that owns playwright:
const req2 = createRequire("/workspace/fab4m.org-astro/package.json");
const { chromium } = req2("playwright");
```

```js
// CJS entry (file ends in .cjs)
const { chromium } = require("playwright");
```

If `require`/`req2("playwright")` throws "Cannot find module", find it manually:
```bash
node -e "console.log(require.resolve('playwright', {paths:['/workspace/fab4m.org-astro']}))"
```
and `import` the resulting absolute path's default export as `pkg`, then
`const { chromium } = pkg;`.

### Detect reloads / unwanted native submissions

Track document-typed requests always, but only attach the navigation listener
**after** `goto()` resolves — `goto()` itself fires `framenavigated`, so attaching
before it makes `reloaded` always `true` (a false positive):

```js
const docs = [];
page.on("request", (r) => { if (r.resourceType() === "document") docs.push(r.method() + " " + r.url()); });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
// Only count navigations AFTER the initial load:
let reloaded = false;
page.on("framenavigated", (f) => { if (f === page.mainFrame()) reloaded = true; });
// ...interaction...
console.log("reloaded:", reloaded);            // expect false
console.log("document requests:", docs);       // expect only the initial GET
```

A native `<form method="post">` submission with no JS handler shows up as a
`POST` document request and `reloaded: true`. A properly prevented JS submit shows
**no** second document request and `reloaded: false`. (`document requests` is the
more reliable signal — the `framenavigated` listener survives navigations of the
same `page` object, so it still fires on an actual reload.)

### Check framework hydration (Astro islands specifically)

```js
const info = await page.evaluate(() => {
  const f = document.querySelector("form");
  return {
    astroIslandDefined: !!customElements.get("astro-island"),  // island runtime injected
    hasRuntime: document.documentElement.outerHTML.includes("this.hydrator"), // dev pre-script
    reactKeys: Object.keys(f || {}).filter(k => k.startsWith("__react")).length, // >0 means hydrated
    awaitChildren: Array.from(document.querySelectorAll("astro-island"))
      .filter(i => i.querySelector('form'))
      .filter(i => i.hasAttribute("await-children")).length, // stuck = not hydrated
  };
});
```

Heuristics (dev mode):
- `astroIslandDefined: false` → the `<astro-island>` custom element was never
  defined → the island runtime pre-scripts were not emitted. Common cause: the
  island is passed as a **named slot** through a wrapper component (Astro drops
  the prescript in that case). Fix: use the **default slot** `<slot/>`.
- `astroIslandDefined: true` but `reactKeys: 0` and a `pageerror` about
  "Invalid hook call / more than one copy of React" → duplicate React instances.
  Often a stale Vite dep cache: `rm -rf node_modules/.vite` and restart dev.

### Fill a form and submit, asserting no reload

```js
await page.getByLabel(/Your name/).first().fill("Test User");
await page.getByLabel(/I agree/).first().check();
await page.getByRole("button", { name: /^Save$/ }).first().click();
await page.waitForTimeout(1500);
const after = await page.evaluate(() => ({
  resultCard: !!document.querySelector(".result-card"),
  url: location.href,
}));
```

### Starlight `<Tabs>`: reveal hidden islands first

Astro Starlight tab panels are `hidden` until their tab is clicked, and islands
inside hidden panels may not hydrate until revealed. Click the Example tab before
interacting:

```js
const tabs = await page.getByRole("tab", { name: "Example" }).all();
await tabs[0].click();
await page.waitForTimeout(2500);
```

## Starter script

Copy `scripts/check-page.mjs` to a temp file, edit the `URL` and interaction
block, and run it with `node`. It prints hydration state, captures errors, and
detects reloads so you get a one-shot diagnosis.

## Interpretation

| Signal | Meaning | Likely fix |
|--------|---------|------------|
| `reloaded: true` + a `POST` doc request | native form submit, JS handler didn't run | island isn't hydrating; see hydration causes below |
| `astroIslandDefined: false` | island runtime not emitted | named-slot-through-wrapper; default slot instead |
| `reactKeys: 0`, no errors, `awaitChildren: N` | island waiting on children that never arrive | parent island/server component wrapping it that itself never hydrates |
| `pageerror: Invalid hook call / more than one copy of React` | duplicate React | clear Vite dep cache (`rm -rf node_modules/.vite`), ensure single `react` version |
| `pageerror: ... is not defined` (a global) | script relies on a global not present | check script ordering / `is:inline` vs module scripts |
| tab panel content not interactive | Starlight tab never revealed | click the tab first, `waitForTimeout` |

## Tips

- Use `waitUntil: "networkidle"` on the initial goto so async chunks settle.
- Add small `waitForTimeout` after tab clicks / submits (hydration + effects are
  async). 1500–2500ms is usually enough.
- `.first()` disambiguates when the same selector matches multiple examples on a
  page (common on docs pages with several embedded examples).
- Prefer role/label locators (`getByRole`, `getByLabel`) over raw CSS — they wait
  for the element to be actionable and are resilient to hydration timing.
- Run from the repo root or the package dir so `createRequire` can resolve
  Playwright from the workspace's `node_modules`.
- The dev server's pre-scripts differ from production. If a bug only reproduces in
  prod, prefer `astro build && astro preview` (or the framework's preview). Some
  sandbox toolchains break prod builds on unrelated grounds — dev is the pragmatic
  default, note if you're testing dev-only behavior.