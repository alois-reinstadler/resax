# Vuesax → Svelte 5 clean-room implementation brief

Captured from the public Vuesax component catalog in Chrome on 2026-08-24. This
document describes observable design and behavior at a high level. It is not a
source-code port and does not grant a license to Vuesax assets.

## Detailed component API reference

Use `CLEAN_ROOM_COMPONENT_SPECS.md` for the reviewer-friendly specification and
`CLEAN_ROOM_COMPONENT_SPECS.json` for automation. Together they cover all 55
families, 515 observed demo props, 323 variants, per-family motion timings and
easing curves, keyframe labels, reduced-motion status, interaction notes, and
recommended shadcn-svelte foundations. Regenerate both with
`build-clean-room-spec.mjs` after updating the source observations.

## Scope observed

- 55 component families and 328 catalog routes.
- Families: Accordion, Alert, Avatar, AvatarGroup, Badge, Breadcrumb, Button,
  ButtonGroup, Calendar, Card, Checkbox, Chip, Code, ColorPicker, ContextMenu,
  Cursor, Dock, DotStepper, Drawer, Dropdown, FileTree, Indicator,
  InlineOverflow, Input, LinkBar, List, NavMenu, Notification, Number, Otp,
  Pagination, Popup, Progress, Radio, RadioGroup, Rating, Scrollbar, Select,
  Separator, Sidebar, Skeleton, SlideConfirm, Slider, Spacer, Spinner, Steps,
  Switch, Table, Tabs, Textarea, TickRail, Timeline, Tooltip, Transform, and
  UploadFile.
- The catalog labels 36 routes Free and 292 PRO.
- Detail pages expose live controls for default props, variant, size, tone,
  radius, disabled state, and component-specific features.

## Visual system

The overall language is soft monochrome, spacious, and animation-led:

- Sans: Outfit Variable, falling back to system UI.
- Mono: Geist Mono Variable, falling back to platform monospace.
- Light canvas: `#fff`; primary text: `#171717`; secondary text: `#5a5a5a`;
  muted text: `#999`; card surface: `#fafafa`; elevated surface: `#f0f0f0`.
- Borders: `#e4e4e4`, hover `#ccc`, strong `#d4d4d4`.
- Semantic accents: blue `#0070f3`, green `#3ecf8e`, red `#ff6b6b`, amber
  `#f5a623`, violet `#8b7dff`.
- Standard control sizes: 32 / 40 / 48 px.
- Standard control font sizes: 13 / 14 / 15 px.
- Standard horizontal padding: 12 / 14 / 18 px.
- Standard control radii: 10 / 12 / 14 px, with pill and squircle options.
- Card radius: 12 px; input radius: 6 px; default control radius: 8 px.
- Floating surfaces use layered, low-opacity shadows rather than one heavy
  shadow. Borders remain visible inside the shadow.
- Squircle is progressive enhancement through `corner-shape: squircle`; a
  larger ordinary radius is the fallback.

## Motion system

The motion grammar is more important than any single effect:

- Frequent timings: 140, 160, 180, 200, 220, 240, 260, 300, and 320 ms.
- Primary ease-out: `cubic-bezier(.22, 1, .36, 1)`.
- Primary spring: `cubic-bezier(.34, 1.56, .64, 1)`.
- Softer springs commonly reduce the overshoot to 1.35–1.5.
- Press feedback generally scales controls to about 0.97.
- A reusable click ripple expands and fades over roughly 780 ms.
- Proximity glow tracks pointer coordinates through component-local CSS
  variables and masks a radial gradient to the border.
- State changes combine transform with opacity; layout-affecting transitions
  are used sparingly.
- Reduced-motion handling is pervasive. A Svelte port should disable ripples,
  continuous loops, large transforms, and spring overshoot under
  `prefers-reduced-motion: reduce`.
- Continuous decorative effects should pause when offscreen or when the page is
  hidden.

## Interaction patterns to reproduce independently

- Accordion: animated disclosure height, rotating indicator, single/multiple
  open modes, disabled items, keyboard-safe buttons.
- Button: primary/secondary/ghost variants, tone, size, radius, loading,
  icon-only, block, disabled, press scale, optional glow and ripple.
- Select/dropdown/context menu: anchored floating layer, outside-click and
  Escape dismissal, roving/arrow keyboard navigation, selected state, springy
  entrance.
- Dialog/popup/drawer: focus management, Escape and backdrop dismissal, scroll
  lock, side/origin variants, opacity plus transform motion.
- Tabs/stepper/pagination: animated active indicator; keyboard navigation must
  remain separate from the visual interpolation.
- Inputs: label/hint/error states, prefix/suffix controls, clear/reveal actions,
  hover/focus rings, readonly and disabled states.
- Switch/checkbox/radio/slider: native form semantics first, animated visual
  layer second; expose bindable values and standard change/input events.
- Dock/cursor/magnetic controls: pointer-distance transforms should use one
  `requestAnimationFrame` loop, cached geometry, and transform-only updates.
- Notification/toast: queue, placement, lifetime/progress, pause on hover/focus,
  swipe or dismiss action, live-region semantics.
- Upload: native file input, drag state, validation, progress, cancellation,
  and no automatic upload side effect.

## Svelte 5 architecture

Use shadcn-svelte for accessibility and state-machine foundations, then layer
the Vuesax-like visual and motion language on top:

- Accordion → shadcn Accordion
- Alert → Alert
- Avatar / AvatarGroup → Avatar
- Badge / Chip / Indicator → Badge plus Button where interactive
- Breadcrumb → Breadcrumb
- Button / ButtonGroup → Button
- Calendar → Calendar plus Popover
- Card / Code → Card
- Checkbox → Checkbox
- ContextMenu → Context Menu
- Drawer → Sheet
- Dropdown → Dropdown Menu
- FileTree → Collapsible
- Input / Textarea / Number → Input, Textarea, Button
- NavMenu / LinkBar → Navigation Menu
- Notification → Sonner
- OTP → Input OTP
- Pagination / DotStepper → Pagination
- Popup → Dialog
- Progress → Progress
- Radio / RadioGroup → Radio Group
- Scrollbar → Scroll Area
- Select → Select
- Separator → Separator
- Sidebar → Sidebar
- Skeleton → Skeleton
- Slider / SlideConfirm / TickRail → Slider
- Switch → Switch
- Table → Table
- Tabs → Tabs
- Tooltip / Dock labels → Tooltip

For Svelte 5, prefer:

- `$props()` for typed public props and `$bindable()` for values/open state.
- `$state` only for component-owned transient state.
- `$derived` for class/state projections instead of duplicated writable state.
- Snippets for icons, labels, triggers, item content, and empty states.
- Attachments/actions for pointer glow, ripple, resize observation, outside
  click, focus trapping, and drag gestures.
- CSS custom properties as the public styling contract; do not make consumers
  override internal selectors.
- shadcn/Bits UI data attributes as stable state hooks for CSS motion.
- Native elements and ARIA semantics as the interaction source of truth.

## Recommended package layers

1. Tokens: color, typography, size, radius, shadow, duration, and easing.
2. Effects: ripple, proximity glow, spring press, presence, and reduced-motion.
3. shadcn-backed primitives: Button, Input, Checkbox, Radio, Switch, Tabs,
   Select, Accordion, Dialog, Sheet, Tooltip, and menus.
4. Composite components: Calendar, FileTree, Sidebar, Table, Upload, OTP,
   Notification, Dock, and Timeline.
5. Experimental pointer-heavy components: Cursor, magnetic controls, liquid or
   gooey variants, and transforms.

## Validation checklist

- Keyboard-only use and visible focus for every interactive control.
- Screen-reader name, role, value, expanded/selected/checked state.
- Light and dark themes plus custom accent colors.
- 32/40/48 px size scale and all radius modes.
- Pointer, touch, and coarse-pointer behavior.
- Reduced motion and page-visibility pausing.
- No layout shift when indicators, menus, or validation messages appear.
- SSR/hydration safety: browser globals only inside effects/actions.
- Form participation, reset behavior, and controlled/uncontrolled bindings.

## Licensing stop

Vuesax's Terms of Service currently say that assets may not be bulk scraped,
redistributed as a component catalog/UI kit/library, used to build a competing
product, or used to create a dataset intended to reproduce the catalog. The
same restrictions are stated to apply to Free items. Obtain explicit written
authorization from Vuesax before using their extracted assets or implementation
source for a Svelte component library.

Source: https://vuesax.com/terms#license
