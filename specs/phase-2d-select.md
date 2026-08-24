# Spec: Phase 2d — Select

Status: blocked until Phase 2a–2c merge (single-component stream; Select is the largest form component).
Standard ground rules (AGENTS.md, own worktree, `pages/` demo, fidelity notes). bits-ui Select and Combobox — fetch live docs first and pick per mode below.

## select — `src/lib/registry/ui/select/`

Vuesax select: floating label like Input, colored focus, single/multiple, filterable, multiple-as-chips, option groups, states/messages.

Exports: `Select`, `SelectItem`, `SelectGroup` (one registry item). Use bits-ui Select for the non-filter modes and bits-ui Combobox when `filter` is set — share one wrapper API; internal switch is an implementation detail.

```ts
interface SelectProps {
  value?: string | string[];        // $bindable; array iff multiple
  multiple?: boolean;
  filter?: boolean;                 // typeahead filtering of options
  chips?: boolean;                  // multiple selections render as removable Chip components (local:chip dep)
  label?: string;                   // floating label, same anatomy/animation as input
  placeholder?: string;
  color?: RxColor; size?: 'lg' | 'default' | 'sm';
  state?: 'default' | 'success' | 'danger' | 'warn';
  message?: string | Snippet;
  disabled?: boolean; loading?: boolean;
  children: Snippet;                // SelectItem/SelectGroup content
  onValueChange?: (value: string | string[]) => void;
}
interface SelectItemProps { value: string; label?: string; disabled?: boolean; children?: Snippet; }
interface SelectGroupProps { label: string; children: Snippet; }
```

- Dropdown panel: portal, token surface, active-item accent (`--rx-color` tint), check mark on selected, open/close via easing-token scale+fade; keyboard/typeahead/aria entirely from bits-ui.
- Reuse the Input wrapper look (border/focus/label/message classes) — extract shared CSS into the select's own styles by copying the established input classes if a clean import isn't possible; do NOT refactor the input component in this stream (note duplication for the planner instead).
- `chips` mode uses the existing Chip registry component (`registryDependencies: local:chip`), close removes the value.

## Demo page, registry, tests

- `src/lib/docs/pages/select.svelte`: single, multiple, multiple+chips, filter, groups, states, sizes, colors, disabled options, loading.
- Registry: 1 item, bits-ui npm dep, `local:` deps incl. `local:chip`; checker += 1.
- Tests: value bindable single + multiple round-trip; chips removal updates value; filter narrows rendered options; `onValueChange` payload types; disabled item not selectable; aria roles present (listbox/combobox per mode).

## Acceptance criteria

Standard set + bits-ui version note + explicit note on any CSS duplicated from input.
