# Spec: Phase 2b — Checkbox, Switch, Radio + RadioGroup

Status: blocked until Phase 1 streams merge (branch from main after 1d/1e/1f land).
Standard ground rules (AGENTS.md, own worktree, pages/ demos, fidelity notes).

**This stream introduces bits-ui.** Before implementing, fetch the live bits-ui docs for Checkbox, Switch and RadioGroup (bits-ui.com/docs/components/...) — use current Svelte-5 bits-ui (child snippet API). bits-ui becomes an npm `dependencies` entry on each registry item that uses it. Wrap bits-ui primitives; never reimplement their a11y/keyboard logic. Styling stays 100% token-driven on our wrapper classes.

## checkbox — `src/lib/registry/ui/checkbox/`

Vuesax signature: animated SVG check drawing in (stroke-dashoffset transition), colored fill when checked.

```ts
interface CheckboxProps {   // extend bits-ui Checkbox root props as passthrough
  checked?: boolean;               // $bindable
  indeterminate?: boolean;         // $bindable
  color?: RxColor; size?: 'lg' | 'default' | 'sm';
  lineThrough?: boolean;           // Vuesax: strikes label text when checked
  disabled?: boolean;
  children?: Snippet;              // label content
  onCheckedChange?: (checked: boolean) => void;
}
```

Check mark = inline SVG path animated via easing tokens; indeterminate renders dash; label click toggles (bits-ui handles via label association); reduced motion = instant draw.

## switch — `src/lib/registry/ui/switch/`

Vuesax switch: pill with sliding thumb, optional inner text/icons per state, square variant, loading.

```ts
interface SwitchProps {
  checked?: boolean;               // $bindable
  color?: RxColor; size?: 'lg' | 'default' | 'sm';
  shape?: 'pill' | 'square';
  loading?: boolean;               // spinner inside thumb, non-interactive
  disabled?: boolean;
  on?: Snippet; off?: Snippet;     // inner content shown in track per state
  onCheckedChange?: (checked: boolean) => void;
}
```

Thumb slide uses easing tokens; track color animates through `--rx-color`.

## radio + radio-group — `src/lib/registry/ui/radio-group/`

One registry item `radio-group` exporting `RadioGroup` + `Radio` (bits-ui RadioGroup). Group context carries `color`/`size` so items inherit.

```ts
interface RadioGroupProps { value?: string /* $bindable */; color?: RxColor; size?: 'lg'|'default'|'sm';
  orientation?: 'vertical' | 'horizontal'; disabled?: boolean; children: Snippet;
  onValueChange?: (value: string) => void; }
interface RadioProps { value: string; disabled?: boolean; children?: Snippet; }
```

Vuesax radio look: hollow ring, inner dot scales in with bounce easing (`RX_EASE_BOUNCE`).

## Demos, registry, tests

- Pages: `checkbox.svelte`, `switch.svelte`, `radio-group.svelte` (slug must match nav: RadioGroup → `radio-group`; also add a `radio.svelte` page that just re-exports/links the group demo so the nav's `Radio` entry lights up — simplest: a small page importing the same demos).
- Registry: `checkbox`, `switch`, `radio-group` items with `dependencies: ["bits-ui"]` (+ tailwind-variants if used) and `local:` registry deps; checker += 3 (+1 if you add a separate radio alias item — don't; keep 3).
- Tests: checked/value bindables round-trip, `onCheckedChange`/`onValueChange` fire, keyboard toggles (space on checkbox/switch, arrows within radio group — exercise via testing-library keyboard), disabled blocks interaction, group context propagates color class.

## Acceptance criteria

Standard set + one extra: report must confirm which bits-ui version was installed and that no bits-ui a11y behavior was overridden.
