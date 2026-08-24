# Spec: Phase 5a — Table, List, Code

Status: ready after Phase 3 merges. Standard ground rules. This stream contains the largest remaining component; do not expand the v1 exclusions. Docs-shell redesign is out of scope.

## Required references

- Inspect matching `VsTable`, `VsList`, and `VsCode` entries and assets under `scrape/vuesax/`, especially prop defaults in `islands/` and exact state CSS in `shadow-css/`.
- Fetch current docs before implementation:
  - https://www.shadcn-svelte.com/docs/components/table
  - https://tanstack.com/table/latest/docs/framework/svelte/svelte-table
  - https://shiki.style/guide/install

Use the official shadcn-svelte `table` item as the semantic/styling base. Use TanStack Table core for state/row models; declare exact runtime dependencies. Do not hand-roll sorting or selection state machines.

## table — `src/lib/registry/ui/table/`

One registry item exporting `Table`, public types, and optional cell/header helpers. Public generics must remain type-safe; no `any`.

```ts
type SortDirection = 'asc' | 'desc';
interface TableColumn<T> {
  id: string; header: string | Snippet; accessor?: keyof T | ((row: T) => unknown);
  cell?: (row: T) => Snippet; sortable?: boolean; width?: string;
  align?: 'left' | 'center' | 'right';
}
interface TableProps<T extends Record<string, unknown>> {
  data: T[]; columns: TableColumn<T>[]; rowId: (row: T) => string;
  color?: RxColor;
  variant?: 'default' | 'bordered' | 'cards' | 'glow' | 'minimal' | 'striped';
  sorting?: { id: string; direction: SortDirection }[]; // $bindable
  selected?: string[]; expanded?: string[];             // $bindable
  selectable?: boolean; expandable?: boolean; expandedContent?: (row: T) => Snippet;
  stickyHeader?: boolean; loading?: boolean; empty?: Snippet;
  page?: number; pageSize?: number;                     // optional client pagination, page bindable
  onSortingChange?: (value: TableProps<T>['sorting']) => void;
  onSelectedChange?: (ids: string[]) => void;
  onExpandedChange?: (ids: string[]) => void;
  onRowClick?: (row: T) => void;
}
```

Requirements: semantic table markup in default/bordered/minimal/striped modes; cards may use responsive CSS but must retain accessible header associations. Header sort buttons expose `aria-sort`. Selection includes labelled row and select-all checkboxes using `local:checkbox`. Expanded content uses a full-span row and preserves focus. Loading uses `local:skeleton`; empty state spans all columns. Client pagination uses `local:pagination` and is omitted when page/pageSize are absent.

V1 exclusions: server-data orchestration, column resizing/reordering, grouping, pinning, virtualization, inline editing, CSV export. The controlled data/sorting API must allow consumers to add server fetching later.

## list — `src/lib/registry/ui/list/`

```ts
interface ListItem { id: string; title: string; description?: string; href?: string; icon?: Snippet; leading?: Snippet; trailing?: Snippet; disabled?: boolean; }
interface ListProps {
  items: ListItem[]; selected?: string | string[];    // $bindable
  selectionMode?: 'none' | 'single' | 'multiple';
  color?: RxColor;
  variant?: 'default' | 'cards' | 'glow' | 'hover' | 'reveal' | 'stripe';
  onSelectedChange?: (value: string | string[] | undefined) => void;
  onActivate?: (item: ListItem) => void;
}
```

Choose `ul/li` for static lists and listbox/option semantics only when selection is enabled. Interactive rows are buttons or links, never clickable divs. Multiple selection follows listbox keyboard conventions. Reveal animation cannot hide information from keyboard focus.

## code — `src/lib/registry/ui/code/`

```ts
interface CodeProps {
  code: string; language?: string; filename?: string;
  color?: RxColor;
  variant?: 'default' | 'glow' | 'gradient-border' | 'minimal' | 'terminal' | 'window';
  theme?: 'auto' | 'light' | 'dark';
  copyable?: boolean; lineNumbers?: boolean; highlightLines?: number[];
  wrap?: boolean; maxHeight?: string;
  onCopy?: (code: string) => void;
}
```

Syntax highlighting must be SSR-safe and must not ship every Shiki language/theme to the browser. Prefer server/build-time highlighting or a documented small bundled set with dynamic loading. Preserve plain escaped code if highlighting fails or the language is unknown. Copy uses the Clipboard API with a fallback/error state and accessible status announcement. Never render caller code through untrusted `{@html}` unless it has been produced and escaped by the selected highlighter.

## Fixtures, registry, tests

- Fixture pages: `table.svelte`, `list.svelte`, `code.svelte`; no docs-shell changes.
- Add 3 registry items and checker count. Table declares `local:checkbox`, `local:skeleton`, and `local:pagination` when used.
- Tests cover generic column rendering, sort cycles/aria-sort, selection/select-all, expansion, pagination, empty/loading; List semantics and keyboard selection; Code escaping, unknown-language fallback, copy success/failure, and SSR rendering.

## Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, and `pnpm build` pass; report actual output.
- Inspect all three built registry JSON files and their dependency/file lists.
- Report TanStack/Shiki strategy and versions, bundle implications, scrape files consulted, v1 exclusions, file tree, and deviations.
