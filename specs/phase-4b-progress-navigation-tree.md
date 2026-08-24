# Spec: Phase 4b — Steps, DotStepper, Timeline, FileTree

Status: ready after Phase 3 merges; may run independently of Phase 4a. Standard ground rules. Docs-shell design is out of scope.

## Required references

- Exact variants/behavior: matching `VsSteps`, `VsDotStepper`, `VsTimeline`, and `VsFileTree` records and files under `scrape/vuesax/`.
- Evaluate current official/headless options before coding:
  - https://www.shadcn-svelte.com/docs/components/tree-view
  - https://bits-ui.com/docs/components/tree

If the official registry has a production Tree item, use it as a plain-name dependency. Otherwise use the current bits-ui Tree API. Only implement a recursive custom tree if neither supports the specified semantics, and record why.

## steps — `src/lib/registry/ui/steps/`

One compound item exporting `Steps` and `Step`.

```ts
interface StepsProps {
  current?: number;                               // $bindable, zero-based
  orientation?: 'horizontal' | 'vertical';
  color?: RxColor;
  variant?: 'default' | 'arrow' | 'bar' | 'circular' | 'pills' | 'timeline';
  linear?: boolean; clickable?: boolean;
  onCurrentChange?: (index: number) => void;
  children: Snippet;
}
interface StepProps {
  title: string; description?: string; icon?: Snippet;
  disabled?: boolean; error?: boolean; optional?: boolean; children?: Snippet;
}
```

Use ordered-list semantics and expose current/completed/error state. Linear mode prevents jumping past the first incomplete step. Arrow keys follow orientation when steps are interactive.

## dot-stepper — `src/lib/registry/ui/dot-stepper/`

```ts
interface DotStepperProps {
  current?: number; count: number;                // $bindable
  color?: RxColor;
  variant?: 'default' | 'bars' | 'elastic' | 'glow' | 'ring' | 'worm';
  labels?: string[]; disabled?: boolean;
  onCurrentChange?: (index: number) => void;
}
```

Render real buttons inside labelled navigation, not clickable decorative spans. Worm/elastic effects measure adjacent dots and animate transform only. Reduced motion uses an immediate selected-state change.

## timeline — `src/lib/registry/ui/timeline/`

Timeline was present in the scrape but omitted from the old phase list; this spec assigns it explicitly.

```ts
interface TimelineItem { id?: string; title: string; description?: string | Snippet; time?: string; icon?: Snippet; color?: RxColor; }
interface TimelineProps {
  items: TimelineItem[];
  color?: RxColor;
  variant?: 'default' | 'alternating' | 'cards' | 'compact' | 'glow' | 'gradient';
  orientation?: 'vertical' | 'horizontal';
}
```

Use an ordered list. Alternating collapses to one side at narrow widths. A gradient/glow rail must use token/relative-color CSS, with static styling under reduced motion.

## file-tree — `src/lib/registry/ui/file-tree/`

```ts
interface FileTreeNode { id: string; label: string; type: 'file' | 'directory'; children?: FileTreeNode[]; disabled?: boolean; icon?: Snippet; }
interface FileTreeProps {
  nodes: FileTreeNode[];
  expanded?: string[]; selected?: string;           // both $bindable
  color?: RxColor;
  variant?: 'default' | 'compact' | 'glow' | 'guides' | 'highlight' | 'reveal';
  selectionMode?: 'single' | 'none';
  onExpandedChange?: (ids: string[]) => void;
  onSelectedChange?: (id: string | undefined) => void;
  onActivate?: (node: FileTreeNode) => void;
}
```

Support nested keyboard navigation (up/down, left collapse/parent, right expand/first child, home/end, enter activation), tree/treeitem roles, levels, selected and expanded states. Node IDs must be unique; warn clearly in development for duplicates. Lazy loading, drag/drop, rename, and multi-select are v1 exclusions.

## Fixtures, registry, tests

- Fixture pages: `steps.svelte`, `dot-stepper.svelte`, `timeline.svelte`, `file-tree.svelte`; no docs-shell changes.
- Add 4 registry items and checker count.
- Tests cover state binding/callbacks, linear restriction, dot labels/buttons, timeline semantics/responsive classes, full FileTree keyboard traversal and disabled nodes.

## Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm registry:check`, `pnpm registry:build`, and `pnpm build` all pass; include actual output lines.
- Inspect the four built JSON files for complete source/dependency coverage.
- Report dependency decision/version for FileTree, scrape files consulted, v1 exclusions, reduced-motion behavior, file tree, and deviations.
