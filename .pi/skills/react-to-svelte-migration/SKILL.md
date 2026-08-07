---
name: react-to-svelte-migration
description: Migrate a React TSX component to Svelte in the packages/svelte/ directory. Use when asked to convert/migrate a specific .tsx file to .svelte, one file at a time. Covers component syntax, state, effects, context, events, and dynamic rendering patterns.
---

# React → Svelte Migration Skill

Migrate a single React `.tsx` file to a Svelte `.svelte` file in `packages/svelte/`. Work one file at a time. If the target `.svelte` file already exists, it has already been migrated—skip it unless asked to overwrite.

## Workflow

1. **Read the source**: Read the `.tsx` file from `packages/svelte/src/` (these are the unmigrated files still containing React code).
2. **Check dependencies**: If the component imports another component that still has a `.tsx` extension in the svelte package, migrate that dependency first.
3. **Convert the file**: Apply the transformation rules below and write the new `.svelte` file.
4. **Remove the old file**: Delete the original `.tsx` file after the `.svelte` version is written.
5. **Don't touch `index.ts` exports**: Ignore barrel file updates—they'll be handled separately.
6. **Don't worry about tests or linting**: Focus only on the local source files.

## Transformation Rules

### File Structure

A Svelte component uses `<script lang="ts">` instead of a function:

```
<script lang="ts">
  // imports and logic here
</script>

<!-- template here -->
```

### Imports

| React | Svelte |
|-------|--------|
| `import * as React from "react"` | Remove entirely |
| `import { useContext } from "react"` | `import { getContext } from "svelte"` or use context getter from `../context` |
| `import { useState } from "react"` | Use `$state()` rune |
| `import { useMemo } from "react"` | Use `$derived()` / `$derived.by()` rune |
| `import { useEffect } from "react"` | Use `$effect()` rune |
| `import { createElement } from "react"` | Use Svelte dynamic component syntax |
| `import { ComponentType } from "react"` | `import { Component } from "svelte"` |
| `import { FormRendererContext } from "../formrenderer"` | `import { getFormRendererContext } from "../formrenderer"` |
| `import { FormDataContext, FormErrorsContext } from "../context"` | `import { getFormDataContext, getFormErrorsContext } from "../context"` |
| Component imports: `import { Foo } from "./Foo"` | `import Foo from "./Foo.svelte"` (use default import, add `.svelte` extension) |

### Props

**React** — function parameter:
```tsx
export function MyComponent(props: MyProps): React.JSX.Element {
  const value = props.value;
```

**Svelte** — `$props()` rune:
```svelte
<script lang="ts">
  type Props = MyProps;
  let { value, onChange }: Props = $props();
</script>
```

For inline types you can also do:
```svelte
<script lang="ts">
  let { value, onChange }: { value: string; onChange: (v: string) => void } = $props();
</script>
```

### State

| React | Svelte |
|-------|--------|
| `const [x, setX] = useState(initial)` | `let x = $state(initial)` |
| `setX(newValue)` | `x = newValue` |

### Derived / Computed Values

| React | Svelte |
|-------|--------|
| `const x = useMemo(() => expr, [deps])` | `const x = $derived(expr)` |
| `const x = useMemo(() => { ...complex... }, [deps])` | `const x = $derived.by(() => { ...complex... })` |

### Effects

| React | Svelte |
|-------|--------|
| `useEffect(() => { ... })` | `$effect(() => { ... })` |
| `useEffect(() => { ...; return () => cleanup() }, [])` | `$effect(() => { ...; return () => cleanup() })` |

### Context

The svelte package uses `createContext` from `svelte` which returns a getter/setter pair.

**React**:
```tsx
const ctx = useContext(MyContext);
```

**Svelte**:
```svelte
<script lang="ts">
  import { getMyContext } from "../context";
  const ctx = getMyContext();
</script>
```

For the form renderer context:
```svelte
<script lang="ts">
  import { getFormRendererContext } from "../formrenderer";
  const { widgetComponents, multipleWidgetComponents } = getFormRendererContext();
</script>
```

### JSX → Svelte Template

| React JSX | Svelte Template |
|-----------|-----------------|
| `className={expr}` | `class={expr}` |
| `onChange={(e) => fn(e.currentTarget.value)}` | `oninput={(e) => fn(e.currentTarget.value)}` |
| `onClick={handler}` | `onclick={handler}` |
| `{...props.attributes}` | `{...attributes}` (spread works the same) |
| `{props.children}` | `<slot />` |
| `key={index}` | Remove (Svelte uses `{#each ... as item, index}`) |
| Conditional: `{cond && <X/>}` | `{#if cond}<X/>{/if}` |
| Ternary: `{cond ? <A/> : <B/>}` | `{#if cond}<A/>{:else}<B/>{/if}` |
| List: `{items.map(i => <X/>)}` | `{#each items as i}<X/>{/each}` |
| `style={{ display: hide ? "none" : "block" }}` | `style:display={hide ? "none" : "block"}` |

### Dynamic Components

**React** (using `createElement` or variable component):
```tsx
const Widget = widgetComponents[name];
return Widget ? <Widget {...props} /> : null;
```

**Svelte** (using `{@const}` and Svelte component rendering):
```svelte
{#if Widget}
  {@const widget = Widget}
  <widget {...props} />
{/if}
```

Or more commonly in this codebase:
```svelte
{#if Widget}
  <Widget {...props} />
{/if}
```

Svelte allows using a variable that holds a component constructor directly in the template.

### Refs

| React | Svelte |
|-------|--------|
| `const ref = useRef(null)` | `let ref: HTMLFormElement` (bind) |
| `ref={ref}` on element | `bind:this={ref}` on element |
| `ref.current?.submit()` | `ref?.submit()` (direct variable access) |

### Event Handlers

- React `onSubmit` → Svelte `onsubmit`
- React `onClick` → Svelte `onclick`
- React `onChange` (for inputs) → Svelte `oninput`
- Prevent default: `onsubmit|preventDefault={handler}` or call `e.preventDefault()` inside handler

### Exported Components

React:
```tsx
export function MyComponent(props: Props): React.JSX.Element { ... }
```

Svelte components are automatically the default export. Remove the `export function` wrapper entirely—just put the logic in `<script lang="ts">`.

### Type Annotations

- Remove `React.JSX.Element` return types
- Remove `React.FC`, `React.ComponentType`, `React.ReactNode`
- Replace `React.ComponentType<WidgetProps<any, any>>` with `Component<WidgetProps<any, any>>` from `svelte`
- Replace `React.SubmitEvent<HTMLFormElement>` with `SubmitEvent` (native DOM type)
- Keep `@fab4m/fab4m` type imports as-is

## Current Migration State

Already migrated to `.svelte`:
- `components/FormComponentView.svelte`
- `components/FormComponentWrapper.svelte`
- `components/FormElement.svelte`
- `components/Input.svelte`
- `components/ValidationErrors.svelte`
- `components/ValidatorInfo.svelte`
- `widgets/Checkbox.svelte`
- `widgets/Details.svelte`
- `widgets/GroupChildren.svelte`
- `widgets/multiple/Multiple.svelte`

Still `.tsx` (need migration):
- `components/FormContext.tsx`
- `components/FormPager.tsx`
- `components/FormPart.tsx`
- `components/FormProvider.tsx`
- `components/FormView.tsx`
- `components/FormWrapper.tsx`
- `components/StatefulFormView.tsx`
- `widgetComponents.tsx`
- `widgets/EmailField.tsx`
- `widgets/Fieldset.tsx`
- `widgets/Group.tsx`
- `widgets/HiddenField.tsx`
- `widgets/HorizontalGroup.tsx`
- `widgets/NumberField.tsx`
- `widgets/Radios.tsx`
- `widgets/Select.tsx`
- `widgets/Submit.tsx`
- `widgets/TextArea.tsx`
- `widgets/TextField.tsx`
- `widgets/URLField.tsx`
- `widgets/UploadField.tsx`
- `widgets/custom.tsx`
- `widgets/multiple/Table.tsx`
- `widgets/multiple/Tags.tsx`
- `types/content/index.tsx`
- `validators/file.tsx`

Also note:
- `allwidgets.ts` — still imports from `.tsx` widget files, will need updating after widgets are migrated
- `hooks.ts` — still contains React `useForm`, `useMemo`, `useContext` imports; needs Svelte adaptation
- `context.ts` — already migrated to Svelte `createContext` pattern
- `formrenderer.ts` — already migrated to Svelte `createContext` + `Component` type
- `index.ts` — barrel file, don't modify during migration

## Example: React Input → Svelte Input

**Before (React `Input.tsx`)**:
```tsx
import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "./FormComponentWrapper";

export function Input(
  props: WidgetProps<string, { prefix?: string } | undefined> & { type: string },
): React.JSX.Element {
  const component = props.component;
  const classes = props.theme.classes;
  return (
    <FormComponentWrapper {...props} prefix={props.settings?.prefix}>
      <input
        type={props.type}
        className={classes.input}
        required={component.required}
        disabled={component.disabled}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        name={props.name}
        id={props.id}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
```

**After (Svelte `Input.svelte`)**:
```svelte
<script lang="ts">
  import { WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "./FormComponentWrapper.svelte";

  type Props = WidgetProps<string, { prefix?: string } | undefined> & {
    type: string;
  };

  let {
    component,
    theme,
    settings,
    value,
    onChange,
    name,
    id,
    attributes,
    hideLabel,
    labels,
    type,
  }: Props = $props();

  let classes = $derived(theme.classes);
</script>

<FormComponentWrapper
  {component}
  {theme}
  {hideLabel}
  {labels}
  {name}
  {id}
  prefix={settings?.prefix}
>
  <input
    {type}
    class={classes.input}
    required={component.required}
    disabled={component.disabled}
    value={value ?? ""}
    oninput={(e) => onChange(e.currentTarget.value)}
    {name}
    {id}
    {...attributes}
  />
</FormComponentWrapper>
```

Key changes:
- No `import * as React` or `React.JSX.Element`
- Props destructured from `$props()`
- `className` → `class`
- `onChange` → `oninput`
- Spread `{...props}` on component → explicit prop passing with shorthand `{name}` syntax
- Import uses `.svelte` extension and default import
- `classes` derived with `$derived()` instead of `props.theme.classes` inline

## Conventions

- Use `<script lang="ts">` (not `<script setup lang="ts">`)
- Prefer `$props()` destructuring at the top of the script
- Use `$derived()` for computed values, `$derived.by()` for complex ones
- Use `$state()` for reactive state
- Use `$effect()` for side effects
- Use Svelte shorthand prop syntax `{name}` instead of `name={name}` where possible
- Keep `@fab4m/fab4m` type imports unchanged
- Keep JSDoc `@group` annotations but update "React" references to "Svelte"
- Keep `@internal` annotations
- When a component receives `children`, use `<slot />`
- For conditional rendering use `{#if}...{/if}` blocks
- For list rendering use `{#each items as item, index}...{/each}` blocks
