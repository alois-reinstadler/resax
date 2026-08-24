# Spec: Phase 3a — Popup (Dialog), Drawer

Status: blocked until the chore spec lands. Standard ground rules (AGENTS.md, own worktree, `pages/` demos, fidelity notes).

**AMENDMENT (overrides bits-ui references below):** per the new AGENTS.md directive, build on the OFFICIAL shadcn-svelte components: install the official `dialog` item as the base for Popup and the official `sheet` item as the base for Drawer (`npx shadcn-svelte add dialog sheet` into this repo's ui path; declare them as plain-name `registryDependencies` on our items). Our components wrap/compose the installed shadcn-svelte components and restyle them with the Vuesax skin (tokens, radii, transitions). Where the text below says "bits-ui Dialog handles X", read "the shadcn-svelte dialog/sheet (which wraps bits-ui) handles X". Keep our public Props API exactly as specced.

## popup — `src/lib/registry/ui/popup/`

Vuesax family: VsPopup + Bounce/Confirm/Flip/SlideUp/Zoom → one component on bits-ui Dialog.

```ts
interface PopupProps {
  open?: boolean;                    // $bindable
  transition?: 'zoom' | 'bounce' | 'flip' | 'slide-up' | 'fade';   // default 'zoom'
  color?: RxColor;                   // header accent
  title?: string | Snippet;
  fullscreen?: boolean;
  preventClose?: boolean;            // blocks overlay-click/escape close
  footer?: Snippet;
  children: Snippet;
  trigger?: Snippet;                 // optional built-in trigger button slot
  onOpenChange?: (open: boolean) => void;
}
```

- bits-ui Dialog handles portal, focus trap, escape, aria. Transitions are ours: keyframe/transition presets per `transition` value using easing tokens (`bounce` uses `RX_EASE_BOUNCE`; `flip` = 3D rotateX entrance); overlay fades; all reduced-motion aware (fall back to fade).
- Vuesax look: heavily rounded surface, floating close button outside top-right corner on desktop.
- `ConfirmPopup` preset export in the same item: title/message/confirm/cancel props, `onConfirm`/`onCancel`, danger color default for destructive mode — composed from Popup + Button (`local:button`).

## drawer — `src/lib/registry/ui/drawer/`

bits-ui Dialog styled as side panel.

```ts
interface DrawerProps {
  open?: boolean;                    // $bindable
  placement?: 'left' | 'right' | 'top' | 'bottom';   // default 'left'
  size?: string;                     // width/height, default '20rem'
  overlay?: boolean;                 // default true; false = push-less inline overlay-free mode
  preventClose?: boolean;
  title?: string | Snippet;
  footer?: Snippet;
  children: Snippet;
  onOpenChange?: (open: boolean) => void;
}
```

Slide transition from placement edge (easing tokens, reduced-motion → fade).

## Demos, registry, tests

- Pages: `popup.svelte` (all transitions, confirm preset, fullscreen, preventClose), `drawer.svelte` (all placements, sizes, no-overlay).
- Registry: 2 items; `popup` has `registryDependencies` incl. `local:button`; bits-ui npm dep on both.
- Tests: open bindable + onOpenChange; preventClose blocks escape/overlay close; confirm preset fires onConfirm/onCancel; drawer placement class mapping; aria-modal/role=dialog present.

## Acceptance criteria

Standard set + bits-ui version note.
