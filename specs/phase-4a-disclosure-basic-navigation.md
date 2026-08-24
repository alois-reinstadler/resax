# Spec: Phase 4a — Accordion, Tabs, Breadcrumb, Pagination

Status: ready after Phase 3 merges. Standard ground rules (AGENTS.md, registry-first, one docs fixture page per component, scrape fidelity notes). Do not redesign the docs shell.

## Required references

- Scrape families and exact shipped behavior: `scrape/vuesax/families.json`, `scrape/vuesax/catalog.json`, and the matching `wc/`, `shadow-css/`, and `islands/` files for `VsAccordion`, `VsTabs`, `VsBreadcrumb`, and `VsPagination`.
- Current official bases (fetch live before implementation):
  - https://www.shadcn-svelte.com/docs/components/accordion
  - https://www.shadcn-svelte.com/docs/components/tabs
  - https://www.shadcn-svelte.com/docs/components/breadcrumb
  - https://www.shadcn-svelte.com/docs/components/pagination

Use the official shadcn-svelte item whenever it supports the required semantics. Declare official items as plain-name `registryDependencies`; every Resax item uses `local:` dependencies. Do not copy APIs from memory.

## accordion — `src/lib/registry/ui/accordion/`

One compound registry item exporting `Accordion` and `AccordionItem`.

```ts
type AccordionValue = string | string[];
interface AccordionProps {
  value?: AccordionValue;                         // $bindable; type follows mode
  mode?: 'single' | 'multiple';                  // default single
  collapsible?: boolean; disabled?: boolean;
  color?: RxColor;
  variant?: 'default' | 'filled' | 'ghost';
  effect?: 'none' | 'bounce' | 'glow' | 'slide';
  onValueChange?: (value: AccordionValue) => void;
  children: Snippet;
}
interface AccordionItemProps {
  value: string; title: string | Snippet;
  disabled?: boolean; icon?: Snippet; children: Snippet;
}
```

The headless base owns keyboard navigation and ARIA. Preserve the scrape's spring height/chevron motion; `slide` adds the accent rail/content entrance, `filled` uses a runtime-color wash, and `glow` uses a relative-color ring. Reduced motion removes spring/translation while preserving visibility changes.

## tabs — `src/lib/registry/ui/tabs/`

Export `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` as one compound item.

```ts
interface TabsProps {
  value?: string;                                // $bindable
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  color?: RxColor;
  variant?: 'default' | 'bubble' | 'card' | 'chrome' | 'gooey' | 'neon';
  onValueChange?: (value: string) => void;
  children: Snippet;
}
interface TabsTriggerProps { value: string; disabled?: boolean; icon?: Snippet; children: Snippet; }
interface TabsContentProps { value: string; children: Snippet; }
```

Implement the moving active indicator by measuring the selected trigger with a reusable attachment/observer, not hardcoded widths. It must update on resize, font load, and orientation change. `gooey` may use an SVG/CSS filter but must degrade cleanly when unsupported. Content transition is fade/short slide; reduced motion is instant.

## breadcrumb — `src/lib/registry/ui/breadcrumb/`

```ts
interface BreadcrumbItem { label: string; href?: string; icon?: Snippet; disabled?: boolean; }
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  color?: RxColor;
  variant?: 'default' | 'arrow' | 'pill' | 'slash' | 'glow';
  maxItems?: number;                              // collapse middle, minimum 3
  separator?: string | Snippet;
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
}
```

Use semantic `nav[aria-label="Breadcrumb"]` and an ordered list. The current page has `aria-current="page"`. Collapsed middle items open an accessible official dropdown-menu (add plain `dropdown-menu` dependency); they are never silently discarded.

## pagination — `src/lib/registry/ui/pagination/`

```ts
interface PaginationProps {
  page?: number;                                  // $bindable, 1-based
  count: number; perPage?: number; siblingCount?: number;
  color?: RxColor;
  variant?: 'default' | 'compact' | 'dots' | 'gooey' | 'ink' | 'segments';
  showEdges?: boolean; showControls?: boolean; showGoto?: boolean;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
}
```

Clamp page when count/perPage changes and emit once. The goto input accepts integers, clamps on commit, and has an explicit accessible label. Preserve active-page motion without animating layout; reduced motion disables goo/ink transitions.

## Fixtures, registry, tests

- Add only the normal auto-discovered fixture pages: `accordion.svelte`, `tabs.svelte`, `breadcrumb.svelte`, `pagination.svelte`. Do not edit routing, navigation, or docs-shell files.
- Add 4 registry items and update the checker expectation. Include every source file and exact dependency edge.
- Tests: accordion single/multiple binding and keyboard movement; tabs roving focus, manual activation, indicator remeasurement; breadcrumb semantics/collapse keyboard selection; pagination range, clamping, controls, goto, and callback deduplication.

## Acceptance criteria

- `pnpm check` — 0 errors and 0 warnings.
- `pnpm test` — all tests pass with no unhandled teardown/rejection output.
- `pnpm registry:check` — passes with the new expected item count.
- `pnpm registry:build` — emits all four JSON items; inspect their files and dependency fields.
- `pnpm build` — production build succeeds.
- Report actual proving output, live dependency versions, scrape files consulted per family, reduced-motion behavior, file tree, and deviations.
