# Astro Migration Plan (Docusaurus → Astro)

## Goals

- Migrate the existing `fab4m.org` documentation site from Docusaurus to Astro.
- Preserve current docs/blog URLs (or provide explicit redirects where needed).
- Keep all interactive examples functional.
- Minimize disruption to package docs authoring workflow.

## Current state (inventory)

From the current Docusaurus site (`fab4m.org`):

- **Docs pages:** 18 files in `fab4m.org/docs`
- **Blog posts:** 6 files in `fab4m.org/blog`
- **Interactive examples:** ~40 `<Example />` usages in docs
- **Raw source imports:** 47 `!!raw-loader!...` imports
- **Docusaurus-specific imports in React components:** 21 (`@docusaurus/*`, `@theme/*`)
- Existing site features to preserve:
  - Docs hierarchy + sidebar
  - Blog index + post pages
  - Custom homepage (`src/pages/index.js`)
  - Tailwind styling + custom CSS
  - Dark mode styling
  - Plausible analytics script
  - Static assets in `static/` including `CNAME`

---

## Recommended target stack

- **Astro** (core site)
- **Starlight** for docs UX (sidebar, navigation, markdown-first docs)
- **MDX** for interactive docs pages
- **React integration** for existing React examples/components
- **Tailwind** (continue existing utility styles)
- **Sitemap** generation

> Why this stack: it keeps markdown/MDX authoring, supports React islands for interactive examples, and provides strong docs ergonomics without rebuilding docs navigation from scratch.

---

## Migration strategy

### Phase 0 — Baseline & scope freeze

1. Freeze current docs content during migration branch work.
2. Capture route baseline from `fab4m.org/build`:
   - `/docs/...`
   - `/blog/...`
   - `/` homepage
3. Define URL compatibility rules:
   - Keep `/docs/*`, `/blog/*`, `/`.
   - Keep `trailingSlash: false` behavior in Astro.

**Deliverable:** route parity checklist.

---

### Phase 1 — Bootstrap Astro site

1. Create new site scaffold (recommended parallel dir first, e.g. `fab4m.org-astro`, then swap in place after validation).
2. Add integrations: React, MDX, Tailwind, Sitemap (and Starlight if selected).
3. Configure site metadata:
   - `site: "https://fab4m.org"`
   - no trailing slash URLs
4. Copy static assets:
   - `fab4m.org/static/*` → Astro `public/*`

**Deliverable:** Astro app builds and serves with base layout.

---

### Phase 2 — Move docs content

1. Copy docs content into Astro docs content area (e.g. `src/content/docs`).
2. Convert Docusaurus metadata:
   - `sidebar_position` and `_category_.json` → Astro/Starlight sidebar config/order.
3. Preserve document slugs so URLs stay stable.
4. Validate markdown features:
   - Admonitions (`:::tip`, `:::caution`)
   - MDX imports and JSX blocks
   - Code fences and syntax highlighting

**Deliverable:** all docs pages render under `/docs/*` with working sidebar.

---

### Phase 3 — Migrate interactive examples

1. Replace Docusaurus-only APIs/components:
   - `@theme/CodeBlock` → Astro/Starlight code block or custom `<CodeBlock>` component
   - `@theme/Tabs` + `@theme/TabItem` → Starlight tabs or custom tabs component
   - `@docusaurus/BrowserOnly` → Astro islands (`client:only` / `client:load`)
   - `@docusaurus/Link` → standard links/Astro links
2. Replace `!!raw-loader!` imports with Vite raw imports (`?raw`).
3. Replace `@site/...` aliases with Astro/Vite alias config or relative imports.
4. Rebuild `src/components/Example.tsx` as Astro-compatible component API so existing MDX usage stays simple.

**Deliverable:** all interactive examples render and code/source tabs work.

---

### Phase 4 — Homepage and shared UI

1. Rebuild `src/pages/index.js` as Astro page using existing React components where practical.
2. Port navbar/footer from `docusaurus.config.js`.
3. Port global CSS from `src/css/custom.css` and verify dark mode variables.
4. Add Plausible analytics script in Astro layout.

**Deliverable:** homepage parity with working CTA links.

---

### Phase 5 — Blog migration

1. Move blog markdown files to Astro content collection (or equivalent blog structure).
2. Convert Docusaurus `<!--truncate-->` excerpts to Astro-compatible summaries/frontmatter.
3. Preserve date-based URLs as closely as possible.
4. Add blog index/archive pages.

**Deliverable:** `/blog` and all existing post URLs work (or redirect map provided).

---

### Phase 6 — Automation & tooling updates

1. Update docs package scripts in `fab4m.org/package.json`:
   - `dev`, `build`, `preview`, `check`
2. Remove Docusaurus dependencies once cutover is complete.
3. Update `bin/collect-docs.mjs` (if retained) to emit Astro-compatible MDX imports and paths.
4. Add link checking + `astro check` to validation workflow.

**Deliverable:** clean Astro build pipeline with no Docusaurus runtime dependencies.

---

### Phase 7 — QA and cutover

1. Content parity checks:
   - 18 docs pages
   - 6 blog posts
2. Functional checks:
   - Interactive examples load and execute
   - Sidebar navigation order matches current docs
   - Dark/light mode visual sanity
3. SEO/infra checks:
   - sitemap generated
   - canonical URLs/site metadata
   - `CNAME` copied
4. Publish Astro site and remove legacy Docusaurus site files.

**Deliverable:** production cutover complete.

---

## Docusaurus → Astro mapping (key items)

| Docusaurus concept | Astro equivalent |
|---|---|
| `docusaurus.config.js` site metadata/navbar/footer | `astro.config.*` + layout/components |
| `docs/` + `_category_.json` + `sidebar_position` | content collection + sidebar config/order |
| `@theme/CodeBlock` | fenced code + Astro/Starlight code renderer/custom component |
| `@theme/Tabs`, `@theme/TabItem` | Starlight tabs/custom tabs |
| `@docusaurus/BrowserOnly` | `client:*` hydration directives |
| `!!raw-loader!file` | `import source from "file?raw"` |
| `@site/...` path alias | Astro/Vite alias (or relative imports) |
| `static/` | `public/` |
| `<!--truncate-->` | frontmatter excerpt/summary or custom extractor |

---

## Risks and mitigations

1. **Interactive MDX complexity (highest risk)**
   - Mitigation: migrate `Example` component first and test on 2–3 representative pages before bulk conversion.
2. **URL drift**
   - Mitigation: generate old/new route manifests and enforce redirects for differences.
3. **Raw import/path breakage in monorepo**
   - Mitigation: define aliases early and add CI check that imports resolve.
4. **Styling regressions (Infima → Astro/Starlight styles)**
   - Mitigation: keep custom CSS variables and run visual pass on homepage/docs/blog.
5. **Blog excerpt differences (`truncate`)**
   - Mitigation: script frontmatter excerpt generation for existing posts.

---

## Definition of done

- [ ] Astro docs site builds cleanly.
- [ ] Docs routes under `/docs/*` are live and ordered correctly.
- [ ] Blog routes under `/blog/*` are live (or redirected).
- [ ] All interactive examples used in docs render and execute.
- [ ] No broken internal links.
- [ ] Analytics and static assets (`CNAME`, icons) are preserved.
- [ ] Docusaurus dependencies removed from final docs package.

---

## Suggested execution order (practical)

1. Bootstrap Astro + base layout + static assets
2. Migrate one complex docs page (`guide/define-a-form.mdx`) end-to-end
3. Build reusable replacements (`Example`, code block, tabs)
4. Bulk migrate remaining docs
5. Migrate homepage
6. Migrate blog
7. QA + route redirects + cutover
