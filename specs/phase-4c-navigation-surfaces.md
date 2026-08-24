# Spec: Phase 4c — Sidebar, NavMenu, LinkBar, Dock, Scrollbar

Status: ready after Phase 3 merges; may run independently of Phase 4a/4b. Standard ground rules. Do not redesign the docs shell.

## Required references

- Inspect the matching `VsSidebar`, `VsNavMenu`, `VsLinkBar`, `VsDock`, and `VsScrollbar` records plus `wc/`, `shadow-css/`, and `islands/` files under `scrape/vuesax/`.
- Fetch current official docs before choosing composition APIs:
  - https://www.shadcn-svelte.com/docs/components/sidebar
  - https://www.shadcn-svelte.com/docs/components/navigation-menu
  - https://www.shadcn-svelte.com/docs/components/scroll-area

Use official `sidebar`, `navigation-menu`, and `scroll-area` items when their live APIs meet the spec, declared as plain-name dependencies.

## sidebar — `src/lib/registry/ui/sidebar/`

Compose the official Sidebar architecture rather than creating another provider/focus/mobile layer. Export a Resax `Sidebar` plus thin item/group exports needed by consumers.

```ts
interface SidebarItem { id: string; label: string; href?: string; icon?: Snippet; badge?: string | number; disabled?: boolean; children?: SidebarItem[]; }
interface SidebarProps {
  items: SidebarItem[]; active?: string; open?: boolean; collapsed?: boolean; // bindable state
  color?: RxColor;
  variant?: 'default' | 'classic' | 'floating' | 'glow' | 'gradient' | 'minimal' | 'rail';
  side?: 'left' | 'right'; header?: Snippet; footer?: Snippet;
  onActiveChange?: (id: string) => void;
}
```

Mobile behavior, keyboard focus, tooltips in rail mode, and persistence hooks come from the official base. Do not write global localStorage behavior. Nested groups are at most two levels for v1.

## nav-menu — `src/lib/registry/ui/nav-menu/`

```ts
interface NavMenuItem { label: string; href?: string; icon?: Snippet; description?: string; children?: NavMenuItem[]; content?: Snippet; }
interface NavMenuProps {
  items: NavMenuItem[]; value?: string;             // $bindable
  color?: RxColor;
  variant?: 'default' | 'glow' | 'mega' | 'pill' | 'spotlight' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  onValueChange?: (value: string) => void;
}
```

Official NavigationMenu owns viewport positioning and keyboard behavior. Mega content supports provided snippets; the data-only fallback lays children into labelled links.

## link-bar — `src/lib/registry/ui/link-bar/`

```ts
interface LinkBarItem { id: string; label: string; href?: string; icon?: Snippet; disabled?: boolean; }
interface LinkBarProps {
  items: LinkBarItem[]; active?: string;             // $bindable
  color?: RxColor;
  variant?: 'default' | 'glow' | 'magnet' | 'pill' | 'slide' | 'underline';
  onActiveChange?: (id: string) => void;
}
```

Implement a resize-aware moving indicator. Magnet effect is pointer-only decoration and cannot move focus/hit targets; remove it for coarse pointers and reduced motion.

## dock — `src/lib/registry/ui/dock/`

```ts
interface DockItem { id: string; label: string; icon: Snippet; href?: string; disabled?: boolean; onSelect?: () => void; }
interface DockProps {
  items: DockItem[]; color?: RxColor;
  variant?: 'default' | 'aurora' | 'bounce' | 'glass' | 'gooey' | 'magnet' | 'neon';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  magnification?: number; distance?: number;
  onSelect?: (item: DockItem) => void;
}
```

Pointer proximity scaling uses one pointer listener and CSS variables/derived transforms; do not install a listener per item. Items remain keyboard-accessible with tooltips/labels. Reduced motion and coarse pointers show a static dock.

## scrollbar — `src/lib/registry/ui/scrollbar/`

```ts
interface ScrollbarProps {
  orientation?: 'vertical' | 'horizontal' | 'both';
  color?: RxColor;
  variant?: 'default' | 'dots' | 'glow' | 'gradient' | 'minimal' | 'rounded';
  size?: 'sm' | 'default' | 'lg';
  hideDelay?: number; children: Snippet;
}
```

Wrap official ScrollArea where available. Native scrolling, wheel/touch, focus visibility, and layout must remain intact. Never hide scrollbars without rendering a usable replacement. Reduced motion disables thumb fade movement, not scrolling.

## Fixtures, registry, tests

- Fixture pages: `sidebar.svelte`, `nav-menu.svelte`, `link-bar.svelte`, `dock.svelte`, `scrollbar.svelte`; no docs-shell edits.
- Add 5 registry items and checker count.
- Test sidebar bindables/mobile/rail labels; NavMenu roles and keyboard opening; LinkBar selection/resize; Dock keyboard selection and one-listener cleanup; Scrollbar keyboard/native scroll and orientation.

## Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, and `pnpm build` pass with actual output reported.
- Inspect all five built item JSON files and report official base versions/dependency edges.
- Report scrape files consulted, responsive/coarse-pointer/reduced-motion behavior, file tree, and deviations.
