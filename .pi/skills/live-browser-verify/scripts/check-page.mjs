// Live browser verification starter.
//
// Usage:
//   1. Start your dev/preview server (e.g. `nohup pnpm dev > /tmp/dev.log 2>&1 &`).
//   2. Edit the URL and INTERACTION block below.
//   3. `node check-page.mjs`
//
// Imports Playwright robustly via createRequire so it works under pnpm symlinks /
// store layouts. If playwright can't be resolved, see SKILL.md "Import Playwright".

import { createRequire } from "module";

// Anchor resolution to the project that owns playwright. Change this path (or pass
// a different package.json) to resolve from the right workspace package.
const req = createRequire("/workspace/fab4m.org-astro/package.json");
const { chromium } = req("playwright");

// ---------- config ----------
const URL = "http://localhost:4321/guides/define-a-form/";
// If the interactive element lives behind a Starlight/Astro tab named "Example",
// we click it first. Comment out UI_TAB_LABEL if not needed.
const UI_TAB_LABEL = "Example";
// ---------- end config ----------

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Capture every signal that matters for "did it reload / hydrate / error" checks.
// Track document requests always (so we can see the initial GET), but only count
// navigations *after* the initial load as a reload — goto() itself fires
// framenavigated, which would otherwise be a false positive.
let reloaded = false;
const docRequests = [];
page.on("request", (r) => {
  if (r.resourceType() === "document") docRequests.push(`${r.method()} ${r.url()}`);
});
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("PE: " + e.message));
const consoleLog = [];
page.on("console", (m) => consoleLog.push(`${m.type()} ${m.text()}`));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Start counting reloads only after the initial load is settled.
page.on("framenavigated", (f) => {
  if (f === page.mainFrame()) reloaded = true;
});

// Reveal the interactive tab if configured.
if (UI_TAB_LABEL) {
  const tabs = await page.getByRole("tab", { name: UI_TAB_LABEL }).all();
  if (tabs.length) {
    await tabs[0].click();
    await page.waitForTimeout(2500);
  }
}

// ---------- hydration snapshot (Astro-aware) ----------
function hydrationSnapshot() {
  const f = document.querySelector("form");
  return {
    astroIslandDefined: !!customElements.get("astro-island"),
    hasRuntime: document.documentElement.outerHTML.includes("this.hydrator"),
    reactKeys: Object.keys(f || {}).filter((k) => k.startsWith("__react")).length,
    awaitChildrenCount: Array.from(document.querySelectorAll("astro-island"))
      .filter((i) => i.querySelector("form"))
      .filter((i) => i.hasAttribute("await-children")).length,
  };
}
const hyd = await page.evaluate(hydrationSnapshot);
console.log("hydration:", JSON.stringify(hyd));

// ---------- INTERACTION BLOCK (edit for your page) ----------
// Example: fill required fields on the first embedded form and submit it, then
// assert the "Submitted Data" card appears and no reload happened.
await page.getByLabel(/Your name/).first().fill("Test User");
await page.getByLabel(/I agree/).first().check();
await page.getByRole("button", { name: /^Save$/ }).first().click();
await page.waitForTimeout(1500);
// ---------- end interaction ----------

const after = await page.evaluate(() => ({
  resultCard: !!document.querySelector(".result-card"),
  bodyHasSubmittedText: document.body?.innerText.includes("Test User"),
  url: location.href,
}));

console.log("after:", JSON.stringify(after));
console.log("reloaded:", reloaded);
console.log("document requests:", docRequests);
console.log("errors:", errors.length, errors.slice(0, 5));
// Uncomment to dump all console messages when debugging:
// console.log("console:", consoleLog.slice(0, 20));

await browser.close();