# Migrating from Vuesax to Resax

Resax preserves Vuesax's expressive visual variants while adopting Svelte 5 composition and shadcn-svelte registry delivery. Install `theme` before individual items and replace Vue templates incrementally.

## Framework patterns

| Vue/Vuesax | Svelte 5/Resax |
| --- | --- |
| `:prop="value"` | `{value}` or `prop={value}` |
| `v-model="value"` | `bind:value` (a `$bindable` prop) |
| `@change="handler"` | `onValueChange={handler}` callback prop |
| default/named slots | `children` and named `Snippet` props |
| scoped slot props | snippet parameters |
| `v-if` / `v-for` | `{#if}` / `{#each}` |
| plugin/global registration | registry install, then a local import |
| separate variant components | `variant`, `effect`, `shape`, or `orientation` props |

## Family coverage (57/57 assigned)

`Merged` means the scraped family is exported by the named registry item rather than installed separately.

| Vuesax family | Resax registry item | Treatment |
| --- | --- | --- |
| Accordion | `accordion` | Direct |
| Alert | `alert` | Direct |
| AskAiButton | `ask-ai-button` | Direct |
| Avatar | `avatar` | Direct |
| AvatarGroup | `avatar` | Merged as `AvatarGroup` |
| Badge | `badge` | Direct |
| Breadcrumb | `breadcrumb` | Direct |
| Button | `button` | Direct |
| ButtonGroup | `button-group` | Direct |
| Calendar | `calendar` | Direct |
| Card | `card` | Direct |
| Checkbox | `checkbox` | Direct |
| Chip | `chip` | Direct |
| Code | `code` | Direct |
| ColorPicker | `color-picker` | Direct |
| ContextMenu | `context-menu` | Direct |
| Cursor | `cursor` | Direct |
| Dock | `dock` | Direct |
| DotStepper | `dot-stepper` | Direct |
| Drawer | `drawer` | Direct |
| Dropdown | `dropdown` | Direct |
| FileTree | `file-tree` | Direct |
| Indicator | `indicator` | Direct |
| InlineOverflow | `inline-overflow` | Direct |
| Input | `input` | Direct |
| LinkBar | `link-bar` | Direct |
| List | `list` | Direct |
| NavMenu | `nav-menu` | Direct |
| Notification | `notification` | Direct |
| Number | `input-number` | Renamed |
| Otp | `input-otp` | Renamed |
| Pagination | `pagination` | Direct |
| Popup | `popup` | Direct |
| Progress | `progress` | Direct |
| Radio | `radio-group` | Merged as `Radio` |
| RadioGroup | `radio-group` | Direct |
| Rating | `rating` | Direct |
| Scrollbar | `scrollbar` | Direct |
| Select | `select` | Direct |
| Separator | `separator` | Direct |
| Sidebar | `sidebar` | Direct |
| Skeleton | `skeleton` | Direct |
| SlideConfirm | `slide-confirm` | Direct |
| Slider | `slider` | Direct |
| Spacer | `spacer` | Direct |
| Spinner | `spinner` | Direct |
| SplitButton | `split-button` | Direct |
| Steps | `steps` | Direct |
| Switch | `switch` | Direct |
| Table | `table` | Direct |
| Tabs | `tabs` | Direct |
| Textarea | `textarea` | Direct |
| TickRail | `tick-rail` | Direct |
| Timeline | `timeline` | Direct |
| Tooltip | `tooltip` | Direct |
| Transform | `transform` | Direct |
| UploadFile | `upload-file` | Direct |

## Intentional v1 exclusions

- Data tables omit server orchestration, resizing/reordering, grouping, pinning, virtualization, inline editing, and export.
- FileTree omits lazy loading, drag/drop, rename, and multiple selection.
- Upload and notification transports remain application-owned.
- Visual cursor effects do not replace native focus or pointer semantics.
- Registry source is the distribution artifact; there is no Resax npm package or Vue compatibility layer.
