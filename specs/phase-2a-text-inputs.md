# Spec: Phase 2a — Input, Textarea, InputNumber

Status: blocked until Phase 1 streams merge (branch from main after 1d/1e/1f land).
Standard ground rules: AGENTS.md conventions, own worktree, demo pages in `src/lib/docs/pages/`, fetch live demos for fidelity, report per AGENTS.md.

Vuesax's input identity: floating/inside labels, colored focus states, icon slots, validation states with slide-down messages, shadow/border styles. No bits-ui needed for this stream (native elements).

## input — `src/lib/registry/ui/input/`

```ts
interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'value'> {
  value?: string;                  // $bindable
  variant?: 'default' | 'shadow' | 'border';   // border = underline/outline emphasis on focus
  color?: RxColor;                 // focus/label accent
  size?: 'lg' | 'default' | 'sm';
  label?: string;                  // floating label: rests as placeholder, floats up on focus/content
  labelPlaceholder?: boolean;      // Vuesax label-placeholder mode (label floats OUTSIDE on focus)
  state?: 'default' | 'success' | 'danger' | 'warn';  // colors border/icon + message
  message?: string | Snippet;      // validation/help text, slides down when present
  icon?: Snippet; iconAfter?: boolean;
  loading?: boolean;
}
```

- Root wrapper div owns layout/label/message; input gets rest props + generated `id` (`$props.id()`) wired to `<label for>`.
- Floating label animates with easing tokens; must not rely on `placeholder-shown` alone (works with `value` bindable too).
- `state` recolors via `--rx-color` override on the wrapper (not new class matrices); message region uses Svelte transition; `aria-invalid` + `aria-describedby` when danger message present.

## textarea — `src/lib/registry/ui/textarea/`

Same wrapper anatomy as input (label, states, message, counter): `value` bindable, `autoResize?: boolean` (grows with content — use an attachment measuring scrollHeight), `maxlength` counter display when set (`{length}/{max}`).

## input-number — `src/lib/registry/ui/input-number/`

Vuesax VsNumber: compact stepper (− value +).

```ts
interface InputNumberProps { value?: number /* $bindable */; min?: number; max?: number; step?: number;
  color?: RxColor; size?: 'lg' | 'default' | 'sm'; disabled?: boolean; }
```

Buttons repeat on press-and-hold (interval with cleanup); clamp to min/max; buttons disable at bounds; root `role="spinbutton"` semantics via the inner `<input type="number">` (keep native input for keyboard/a11y, hide spinners via CSS).

## Demos, registry, tests

- Pages: `input.svelte`, `textarea.svelte`, `input-number.svelte` — variants, states+messages, floating vs label-placeholder, icons, loading, autoresize, counter, stepper hold-repeat note.
- Registry: 3 `registry:ui` items, `local:` deps per imports; checker counts += 3.
- Tests: bindable round-trips (type → value updates), label floats when value set programmatically, `aria-invalid`/`aria-describedby` wiring, number clamping + bound-disable, textarea counter, autoresize attachment sets height (jsdom-safe assertion: style updated after input event).

## Acceptance criteria

Standard set (check 0 / tests / registry build+check / build / dev-server curl markers / token-only colors / report with fidelity notes).
