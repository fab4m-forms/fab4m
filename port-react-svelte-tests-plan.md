# Port React Tests → Svelte: Plan

## Key differences (React ↔ Svelte test stack)

| Concern | React (`@fab4m/react`) | Svelte (`@fab4m/svelte`) |
|---|---|---|
| Test framework | vitest + jsdom | vitest (server + browser projects) |
| Component renderer | `@testing-library/react` | `vitest-browser-svelte` |
| Event simulation | `fireEvent` (jsdom) | Playwright browser (real DOM) |
| File extensions | `.test.tsx` / `.spec.tsx` | `.svelte.spec.ts` (client) / `.spec.ts` (server) |
| Provider helper | `renderWithProvider` wraps in `<FormProvider>` | Same pattern, but render with `vitest-browser-svelte` |
| Test location | `packages/react/test/` | `packages/svelte/src/lib/` (colocated) |

## 1. Test utilities (create first)

### `src/lib/test-utils/renderWithProvider.ts`
```ts
import { render } from "vitest-browser-svelte";
import FormProvider from "../components/FormProvider.svelte";
import { allWidgetsRenderer } from "../allwidgets.js";

export function renderWithProvider(component: Parameters<typeof render>[0], props?: Record<string, unknown>) {
  return render(FormProvider, {
    props: { renderer: allWidgetsRenderer, children: /* snippet */ }
  });
}
```

**Problem**: In Svelte 5, the `children` prop is a `Snippet`, not a component. `vitest-browser-svelte`'s `render` doesn't directly support wrapping. Need to write a small wrapper Svelte component, or use Svelte `@render` with a slot pattern. **Alternative**: Write a `TestProvider` wrapper component that takes the inner component name + props and renders both.

### `src/lib/test-utils/fieldHelpers.ts`
Port `inputElementOk` as a parameterized test helper that checks:
- Standard element properties (id, name match field name)
- Custom id via `id` prop
- Custom name via `name` prop
- Hidden label via `hideLabel`
- Disabled state
- Required indicator (*)

### `src/lib/test-utils/getFormElement.ts`
```ts
export function getFormElement(container: Element): HTMLFormElement {
  const form = container.querySelector("form");
  if (!form) throw new Error("Could not find form");
  return form;
}
```

## 2. Port by category (priority order)

### Phase 1: Foundational (blockers for other tests)

| React test | Svelte target | Status |
|---|---|---|
| `test/util.tsx` (renderWithProvider, getFormElement, inputElementOk) | `src/lib/test-utils/` | ✅ Complete — 5/5 tests pass |
| `test/formlabel.test.tsx` | `src/lib/components/FormElement.svelte.spec.ts` | ✅ Complete — 3/3 tests pass |
| `test/types/textfield.test.tsx` | `src/lib/widgets/TextField.svelte.spec.ts` | ✅ Complete — 13/13 tests pass (3 direct + 10 via inputElementOk) |
| `test/types/submit.test.tsx` | `src/lib/widgets/Submit.svelte.spec.ts` | ✅ Complete — 1/1 test passes |

### Phase 2: Core form components

| React test | Svelte target | Notes |
|---|---|---|
| `test/form.test.tsx` | `src/lib/components/FormView.svelte.spec.ts` | Form rendering, validation, extra info, hideSubmit, custom errors, idPrefix, event handlers, disabled submit |
| `test/statefulform.test.tsx` | `src/lib/components/StatefulFormView.svelte.spec.ts` | Stateful form with internal state, onDataChange |
| `test/formdata.test.tsx` | `src/lib/components/FormView.svelte.spec.ts` (or new file) | FormData conversion, variants conversion, array variants |
| `test/hooks.test.tsx` | `src/lib/hooks.spec.ts` | `useForm` hook equivalent (Svelte `useForm` rune/function) |

### Phase 3: Widgets (type-specific)

| React test | Svelte target | Notes |
|---|---|---|
| `test/types/textfield.test.tsx` | `src/lib/widgets/TextField.svelte.spec.ts` | input/textfield + textarea widgets |
| `test/types/numberfield.test.tsx` | `src/lib/widgets/NumberField.svelte.spec.ts` | integerField + floatField |
| `test/types/booleanfield.test.tsx` | `src/lib/widgets/Checkbox.svelte.spec.ts` | checkbox widget |
| `test/types/emailfield.test.tsx` | `src/lib/widgets/EmailField.svelte.spec.ts` | Email widget |
| `test/types/urlfield.test.tsx` | `src/lib/widgets/URLField.svelte.spec.ts` | URL field widget |
| `test/types/file.test.tsx` | `src/lib/widgets/UploadField.svelte.spec.ts` | File upload field |
| `test/types/group.test.tsx` | `src/lib/widgets/Group.svelte.spec.ts` | Group/Fieldset/Details widgets + nested rules |
| `test/types/content.test.tsx` | `src/lib/types/content/Content.svelte.spec.ts` | Content component rendering |
| `test/types/pagebreak.test.tsx` | `src/lib/components/FormPager.svelte.spec.ts` | Multi-page form pager |
| `test/types/submit.test.tsx` | Already done in Phase 1 | — |

### Phase 4: Validate widget variants

| React test | Svelte target | Notes |
|---|---|---|
| `test/widgets/radios.test.tsx` | `src/lib/widgets/Radios.svelte.spec.ts` | Radio buttons, text + number variants |
| `test/widgets/select.test.tsx` | `src/lib/widgets/Select.svelte.spec.ts` | Select dropdown, text + number variants, notSelectedLabel |
| `test/widgets/hidden.test.tsx` | `src/lib/widgets/HiddenField.svelte.spec.ts` | Hidden field value |
| `test/widgets/tags.test.tsx` | `src/lib/widgets/multiple/Tags.svelte.spec.ts` | Tags multiple widget (add/remove, onChange) |
| `test/widgets/table.test.tsx` | `src/lib/widgets/multiple/Table.svelte.spec.ts` | Table multiple widget (rendering, complex groups) |

### Phase 5: Rules and validators

| React test | Svelte target | Notes |
|---|---|---|
| `test/rules/and.test.tsx` | `src/lib/__tests__/rules-and.svelte.spec.ts` | And rule combinator |
| `test/rules/or.test.tsx` | `src/lib/__tests__/rules-or.svelte.spec.ts` | Or rule combinator |
| `test/rules/not.test.tsx` | `src/lib/__tests__/rules-not.svelte.spec.ts` | Not rule combinator |
| `test/rules/callback.test.tsx` (note: in validators/) | `src/lib/__tests__/rules-callback.svelte.spec.ts` | Callback rules |
| `test/validators/equals.test.tsx` | `src/lib/__tests__/validators-equals.svelte.spec.ts` | Equals rule + validator |
| `test/validators/exists.test.tsx` | `src/lib/__tests__/validators-exists.svelte.spec.ts` | Exists rule + validator |
| `test/validators/minmax.test.tsx` | `src/lib/__tests__/validators-minmax.svelte.spec.ts` | Min/max validators |
| `test/validators/callback.test.tsx` | Moved to Phase 5 rules | — |
| `test/values.spec.tsx` | `src/lib/__tests__/validators-values.svelte.spec.ts` | Allowed/disallowed values validators |
| `test/length.test.tsx` | `src/lib/__tests__/validators-length.svelte.spec.ts` | MinLength/maxLength validator |

### Phase 6: Complex scenarios

| React test | Svelte target | Notes |
|---|---|---|
| `test/ruleengine.test.tsx` | `src/lib/__tests__/ruleengine.svelte.spec.ts` | Complex rule engine: nested rules, data removal on hidden, complex groups, nested array rules, multiple groups |
| `test/multipage.test.tsx` | `src/lib/components/FormPager.svelte.spec.ts` | Multi-page navigation, conditional pages, step-wise validation, hideSubmit |
| `test/multiple.test.tsx` | `src/lib/components/FormComponentView.svelte.spec.ts` | Multiple fields: add/remove, validators on multiple items, labels, min/max items, nested multiple groups |
| `test/variants.test.tsx` | `src/lib/__tests__/variants.svelte.spec.ts` | Dependent variants: dynamic rendering, default component |
| `test/customwidget.test.tsx` | `src/lib/__tests__/customwidget.svelte.spec.ts` | Custom widget + multiple widget |
| `test/defaulttheme.test.tsx` | `src/lib/__tests__/defaulttheme.svelte.spec.ts` | setDefaultTheme with alternative theme (bulma) |

### Phase 7: Validator info components

| React test | Svelte target | Notes |
|---|---|---|
| `test/types/filevalidators.test.tsx` | `src/lib/validators/FileSizeInfo.svelte.spec.ts` + `FileExtensionInfo` | File size + extension validators |

## 3. Svelte-specific porting patterns

### Rendering with provider
```ts
// React
renderWithProvider(<FormView form={form} data={data} />);

// Svelte — need a wrapper component
// Option A: Create TestProvider.svelte that accepts a component prop
// Option B: Use vitest-browser-svelte render with slot children
```

### Event simulation
```ts
// React: fireEvent.input(element, { target: { value: "text" } })
// Svelte (Playwright): await element.fill("text")
```

### Query by label
```ts
// React: findByLabelText("Label text")
// Svelte: page.getByLabelText("Label text")  // vitest 4: renamed from getByLabel
```

### Query by text
```ts
// React: findByText("Button text")
// Svelte: page.getByText("Button text")
```

### Form submit
```ts
// React: fireEvent.submit(formElement)
// Svelte: await submitButton.click()  // click the submit button directly
```

### Assertions
```ts
// React: expect(element.value).toBe("text")
// Svelte: await expect.element(element).toHaveValue("text")

// React: expect(element.disabled).toBe(true)
// Svelte: await expect.element(element).toBeDisabled()

// React: expect(queryByText("x")).toBeNull()
// Svelte: await expect.element(page.getByText("x")).not.toBeInTheDocument()

// React: expect(element.id).toBe("field1")
// Svelte: await expect.element(element).toHaveAttribute("id", "field1")  // vitest 4: toHaveId removed
```

### DOM cleanup
```ts
// React: afterEach(() => { document.body.innerHTML = "" })
// Svelte: import { cleanup } from "vitest-browser-svelte"
//         afterEach(async () => { await cleanup() })  // vitest 4: page.evaluate removed
```

### CSS locator
```ts
// React: container.querySelector("textarea")
// Svelte: page.getByRole("textbox")  // vitest 4: page.locator(CSS) removed, use semantic locators
```

### Dynamic state changes
```ts
// React: fireEvent.input → waitFor → assert
// Svelte: await element.fill("text") → await expect → assert (Playwright auto-waits)
```

## 4. Files that map 1:1 (straightforward port)

These tests have direct Svelte equivalents and identical behavior:

- `test/formlabel.test.tsx` → `FormLabel.svelte.spec.ts`
- `test/types/textfield.test.tsx` → `TextField.svelte.spec.ts`
- `test/types/numberfield.test.tsx` → `NumberField.svelte.spec.ts`
- `test/types/booleanfield.test.tsx` → `Checkbox.svelte.spec.ts`
- `test/types/emailfield.test.tsx` → `EmailField.svelte.spec.ts`
- `test/types/urlfield.test.tsx` → `URLField.svelte.spec.ts`
- `test/types/file.test.tsx` → `UploadField.svelte.spec.ts`
- `test/types/submit.test.tsx` → `Submit.svelte.spec.ts`
- `test/types/content.test.tsx` → `Content.svelte.spec.ts`
- `test/widgets/hidden.test.tsx` → `HiddenField.svelte.spec.ts`
- `test/validators/minmax.test.tsx` → `validators-minmax.svelte.spec.ts`
- `test/length.test.tsx` → `validators-length.svelte.spec.ts`

## 5. Files requiring adaptation

These test core logic from `@fab4m/fab4m` which is framework-agnostic, but the tests use React rendering:

- `test/form.test.tsx` — tests FormView props (className, hideSubmit, disabled, idPrefix, extra), all apply to Svelte FormView
- `test/statefulform.test.tsx` — tests StatefulFormView, Svelte has equivalent
- `test/formdata.test.tsx` — tests FormData conversion, framework-agnostic (core logic)
- `test/hooks.test.tsx` — tests `useForm`, Svelte has equivalent in `hooks.ts`
- `test/ruleengine.test.tsx` — tests rule engine, framework-agnostic logic
- `test/rules/*.test.tsx` — tests rule combinators, framework-agnostic
- `test/variants.test.tsx` — tests conditional variants, framework rendering
- `test/customwidget.test.tsx` — tests custom/customMultiple widgets
- `test/multiple.test.tsx` — tests multiple item add/remove/validation
- `test/multipage.test.tsx` — tests multipage form (some tests commented out in React)
- `test/defaulttheme.test.tsx` — tests setDefaultTheme

## 6. Potential issues

1. **TestProvider wrapper**: `vitest-browser-svelte`'s `render` takes a single Svelte component. To wrap with `FormProvider`, create a `TestProvider.svelte` that accepts a component and renders `{@render children()}`. ✅ Solved with `TestProvider.svelte` in `src/lib/test-utils/`.

2. **Form submit**: In Playwright tests, click the submit button directly rather than using `form.requestSubmit()`.

3. **Rerender pattern**: React tests do `screen.unmount()` + `render()` with new props. In Svelte, we may need to remount the entire component since reactive prop changes don't always trigger the same lifecycle reset.

4. **`useForm` hook**: Svelte `useForm` in `hooks.ts` returns `getFormDataContext()` — it's not a hook creating a form instance like React's `useForm`. The React `useForm` takes a factory and returns a stable form. Svelte equivalent may need `$state` + init function pattern.

5. **Test file naming**: Svelte component tests ending in `.svelte.spec.ts` run in browser project. Non-component tests ending in `.spec.ts` (no `.svelte.`) run in node project. Pure-logic tests (e.g., form helpers) can be `.spec.ts`. Anything that renders a component MUST be `.svelte.spec.ts`.

6. **File locations**: React puts tests under `packages/react/test/`. Svelte colocates tests with source under `packages/svelte/src/lib/`. Keep the `__tests__` directory convention for tests that don't test a specific single component.

7. **ValidatorInfo components**: React's `filevalidators.test.tsx` tests validator info components rendered inside form. Svelte has `FileSizeInfo.svelte` and `FileExtensionInfo.svelte` — need to verify they provide the same info display.

8. **Vitest 4 API changes** (discovered during Phase 1):
   - `page.getByLabel()` → `page.getByLabelText()` (renamed)
   - `page.evaluate()` → **removed**; use `cleanup()` from `vitest-browser-svelte` for DOM cleanup
   - `page.locator(CSS)` → **removed**; use semantic locators (`getByRole`, `getByLabelText`, etc.)
   - `toHaveId()` → **removed**; use `toHaveAttribute("id", value)` instead
   - `toBeAttached()` → **removed**; use `toBeInTheDocument()` on `expect.element()` instead
   - All jest-dom matchers require `expect.element(locator)` chain, not bare `expect(locator)`

## 7. Execution order

1. ✅ Create `src/lib/test-utils/TestProvider.svelte` + helper functions — **DONE**
2. ✅ Port `test/formlabel.test.tsx` → verify test infrastructure works — **DONE** (`FormElement.svelte.spec.ts`)
3. ✅ Port widget tests (Phase 1 + Phase 3) — Phase 1 done (TextField, Submit)
4. Port form tests (Phase 2) — core form behavior
5. Port validators/rules (Phase 5) — pure logic with rendering
6. Port complex tests (Phase 6) — rule engine, multipage, variants
7. Port validator info (Phase 7) — file validator display

## 8. Excluded from port

- The two commented-out test blocks in `statefulform.test.tsx` (stateful form rendering, form cleanup) — already commented out in React source
- The commented-out multipage tests in `multipage.test.tsx` — already commented out
