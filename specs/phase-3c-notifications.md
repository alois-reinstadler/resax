# Spec: Phase 3c — Notification (imperative toast engine)

Status: blocked until the chore spec lands. Standard ground rules. This is the first component with an imperative API — design it carefully; it becomes the pattern for future imperative modules.

## notification — `src/lib/registry/ui/notification/`

Vuesax family: VsNotification + Banner/Card/Glow/Inline/Snackbar.

### Imperative core (`notify.svelte.ts`)

```ts
type NotifyOptions = {
  title?: string; text?: string; content?: Snippet;     // content wins over title/text
  color?: RxColor;
  variant?: 'default' | 'banner' | 'card' | 'glow' | 'inline' | 'snackbar';
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  duration?: number;                  // ms; 0 = sticky; default 4000
  progress?: boolean;                 // countdown bar
  closable?: boolean;
  icon?: Snippet;
  onClick?: () => void; onClose?: () => void;
};
notify(options): { close(): void; update(partial): void }
notify.success/danger/warn/primary(text | options)      // shorthands
```

- Module-level reactive store built with runes in a `.svelte.ts` file (`$state` array of active notifications per position).
- `<NotificationOutlet />` component renders the stacks via portal; mount once in the layout — but `notify()` must ALSO work without a manually-placed outlet by lazily `mount()`ing one to `document.body` on first call (SSR-guarded: imperative calls are client-only; throw a clear error on server).
- Stacking: newest on top for top positions, bottom for bottom; enter/exit via easing-token transitions (slide from edge + fade); hover pauses the countdown (and progress bar); `role="status"` (or `role="alert"` for danger) with `aria-live` region per stack.
- Max visible per stack: 6 — overflow queues (document this).

## Demos, registry, tests

- Page `notification.svelte`: buttons firing each variant/position/color, sticky + progress, update/close handle demo, queue demo.
- Registry: 1 item, multi-file (`notification.svelte`, `notification-outlet.svelte`, `notify.svelte.ts`, `index.ts`); `local:` deps.
- Tests: notify() adds to store and auto-dismisses (fake timers); sticky stays; close() handle works; hover pause (dispatch pointerenter); shorthand colors; queue overflow holds at 6 visible.

## Acceptance criteria

Standard set. Report must describe the lazy-outlet mechanism and SSR guard explicitly.
