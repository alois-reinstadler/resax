# Spec: Phase 3b — Tooltip, Dropdown, ContextMenu

Status: blocked until the chore spec lands. Standard ground rules; live bits-ui docs first (Tooltip, DropdownMenu, ContextMenu).

## tooltip — `src/lib/registry/ui/tooltip/`

```ts
interface TooltipProps {
  content: string | Snippet;
  side?: 'top' | 'right' | 'bottom' | 'left'; align?: 'start' | 'center' | 'end';
  color?: RxColor;                   // default dark surface
  variant?: 'default' | 'border' | 'shadow';   // Vuesax tooltip styles
  delayDuration?: number;
  children: Snippet;                 // trigger
}
```

bits-ui Tooltip (incl. provider — export `TooltipProvider` or handle internally per current docs); arrow matches surface; scale+fade in with easing tokens; interactive-content not required (v1 exclusion).

## dropdown — `src/lib/registry/ui/dropdown/`

Vuesax VsDropdown is a hover/click popover-menu hybrid. Build on bits-ui DropdownMenu with Vuesax skin.

```ts
interface DropdownProps {
  open?: boolean;                    // $bindable
  trigger?: 'click' | 'hover';       // hover adds pointerenter/leave open control with close delay
  color?: RxColor; placement?: Side;
  children: Snippet;                 // trigger element
  content: Snippet;                  // menu content
}
// Plus DropdownItem { icon?, danger?, disabled?, onSelect? }, DropdownGroup { label }, DropdownSeparator (reuse local:separator styling conventions but keep menu-role semantics)
```

Vuesax look: rounded panel, item hover = soft `--rx-color` tint band, danger items in danger color.

## context-menu — `src/lib/registry/ui/context-menu/`

bits-ui ContextMenu; same item/group/separator subcomponents and skin as dropdown (shared CSS may be duplicated; note it). Submenu support from bits-ui (one level demoed).

## Demos, registry, tests

- Pages: `tooltip.svelte`, `dropdown.svelte`, `context-menu.svelte` (nav slugs: `tooltip` is NOT in the Vuesax nav list — check `nav.ts` groups: add 'Tooltip' to the Feedback group in this stream; this is the one sanctioned nav.ts edit).
- Registry: 3 items, bits-ui deps, `local:` deps per imports.
- Tests: tooltip appears on focus (a11y path); dropdown open bindable, hover mode opens/closes with delay (fake timers), item onSelect fires, disabled item doesn't; context menu opens on contextmenu event; menu roles present.

## Acceptance criteria

Standard set + bits-ui version note + note on any CSS shared/duplicated between dropdown and context-menu.
