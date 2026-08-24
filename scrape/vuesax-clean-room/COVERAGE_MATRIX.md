# Coverage matrix

Verified coverage: **328/328 implementations** across **55/55 families**, with **515 observed props**.

| Component | Variants | Props | Styles | Motion | Theme | Reduced motion |
|---|---:|---:|---|---|---|---|
| Accordion | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Alert | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Avatar | 6/6 | 13 | captured | intrinsic motion captured | light/dark token-driven | observed |
| AvatarGroup | 6/6 | 6 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Badge | 6/6 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Breadcrumb | 6/6 | 5 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Button | 15/15 | 12 | captured | intrinsic motion captured | light/dark token-driven | observed |
| ButtonGroup | 1/1 | 10 | captured | composes animated Button children; no group-level keyframes | light/dark token-driven | add/verify |
| Calendar | 6/6 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Card | 8/8 | 13 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Checkbox | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Chip | 6/6 | 12 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Code | 6/6 | 15 | captured | intrinsic motion captured | light/dark token-driven | observed |
| ColorPicker | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| ContextMenu | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | add/verify |
| Cursor | 7/7 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Dock | 7/7 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| DotStepper | 6/6 | 15 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Drawer | 6/6 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Dropdown | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| FileTree | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Indicator | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| InlineOverflow | 1/1 | 12 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Input | 6/6 | 15 | captured | intrinsic motion captured | light/dark token-driven | observed |
| LinkBar | 6/6 | 2 | captured | intrinsic motion captured | light/dark token-driven | observed |
| List | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| NavMenu | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Notification | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Number | 6/6 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Otp | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Pagination | 6/6 | 9 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Popup | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Progress | 6/6 | 11 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Radio | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| RadioGroup | 6/6 | 5 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Rating | 6/6 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Scrollbar | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Select | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Separator | 6/6 | 6 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Sidebar | 7/7 | 10 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Skeleton | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| SlideConfirm | 1/1 | 13 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Slider | 8/8 | 14 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Spacer | 1/1 | 3 | captured | none by design (layout primitive) | light/dark token-driven | add/verify |
| Spinner | 11/11 | 6 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Steps | 6/6 | 8 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Switch | 7/7 | 11 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Table | 6/6 | 11 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Tabs | 7/7 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Textarea | 6/6 | 18 | captured | intrinsic motion captured | light/dark token-driven | observed |
| TickRail | 1/1 | 15 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Timeline | 6/6 | 7 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Tooltip | 6/6 | 5 | captured | intrinsic motion captured | light/dark token-driven | observed |
| Transform | 6/6 | 13 | captured | intrinsic motion captured | light/dark token-driven | observed |
| UploadFile | 6/6 | 12 | captured | intrinsic motion captured | light/dark token-driven | observed |

## Interpretation

- “Captured” means the public demo exposed enough observable structure to make a clean-room specification.
- Theme coverage includes both global light/dark token sets and component use of CSS custom properties. It is not a screenshot test of every variant in both themes.
- ButtonGroup has no independent keyframes because its visual motion is composed from Button children.
- Spacer intentionally has no visual animation.
- “Add/verify” means the independent Svelte implementation must explicitly add a reduced-motion fallback.
