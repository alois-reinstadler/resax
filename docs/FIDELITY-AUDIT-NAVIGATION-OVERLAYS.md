# Source-fidelity audit: navigation, data display, and overlays

Date: 2026-08-25

Scope: accordion, tabs, breadcrumb, pagination, steps, dot-stepper, timeline, file-tree, sidebar, nav-menu, link-bar, dock, scrollbar, popup, drawer, table, list, code, cursor, slide-confirm, inline-overflow, tick-rail, transform, tooltip, dropdown, context-menu, notification, separator, and spacer.

This is a literal implementation audit, not a clean-room interpretation. Raw-reference use is authorized by `references/AUTHORIZATION.md`. The shadow CSS defines the visual layers and timing; the web-component source defines measurement, pointer, keyboard, resize, and state choreography. The compiled Vue artifacts are a parity cross-check. No component was changed during this audit.

## Closure addendum — 2026-08-25

The P0/P1 findings below are the pre-parity source-audit baseline. Two families affected by the final visual closure have since been re-audited and corrected:

- **Dock:** selected glyphs now use the source per-variant ink (accent for base/Aurora/Bounce/Glass/Magnet and text ink for Gooey/Neon). Reduced motion and coarse-pointer behavior are separate: reduced motion disables Dock motion, while coarse input disables pointer-following transforms, glass tilt, sheen, and pointer halo but retains passive Aurora/Neon motion and press feedback. The source has no coarse-pointer branch, so this is an accepted platform/accessibility deviation required by the Phase 4c touch contract; the existing unsupported-`corner-shape` radius fallback remains documented per variant. Evidence: `src/lib/registry/ui/shell-physics.svelte.test.ts`.
- **Notification:** the source family positions are restored (base/banner/inline top-center, card/glow top-right, snackbar bottom-center), as are the 22px tinted status badge with 14px glyph, source edge/padding geometry, measured inner content and goo bridge height, alignment, and outlet spacing. Inline notifications render in normal flow when given `target`; omitting it deliberately retains the fixed outlet for backward compatibility. The base keeps its accepted six-item queue instead of source replacement. The registry-wide default remains the spec-mandated `4000ms` (`duration=0` is sticky): this differs from base's 6000ms, Banner/Card/Glow's 5000ms, and Inline's explicit-dismiss lifecycle, while matching Snackbar's 4000ms. Evidence: `src/lib/registry/ui/notification/notification.svelte.test.ts` and `notify.test.ts`.

The later priority map and “Port gap” paragraphs remain useful historical source notes but no longer describe these final implementations. Canonical final status and deviations are recorded in `docs/FIDELITY-LEDGER.json`.

## Executive finding

The current Svelte port is functionally broad but visually shallow. In most families it maps a source variant name onto a shared DOM and changes only a background, radius, or box-shadow. The source instead treats variants as separate motion systems with distinct layers and, often, distinct geometry and JavaScript. The user's reports about the glow and hover behavior are correct.

The recurring missing mechanisms are:

- masked proximity rings driven by pointer coordinates (`--mx`, `--my`, `--glow`, `--lit`), not static outer shadows;
- independently measured moving indicators with asymmetric or spring-solved leading/trailing edges;
- ripple layers with press coordinates, glyph-clipped radial light, and press squash;
- staggered child entrances and direction-aware panel swaps;
- dynamic blur, squash, stretch, velocity, overscroll, and magnetic displacement written each animation frame;
- variant-specific pseudo-elements/DOM such as conic rings, clip-path arrows, Chrome-tab shoulders, goo blobs, aurora layers, progress beams, ghost thumbs, and handoff layers;
- source-specific enter and leave choreography. The port often styles only `data-state="open"`, leaving close behavior to an unrelated primitive default.

Priority meanings:

- **P0**: the component/variant is recognizably a different design or interaction from the source.
- **P1**: structure is usable, but important source motion, hover, or responsive behavior is absent.
- **P2**: mostly static parity or a narrow finishing gap.

## Priority map

| Priority | Families |
| --- | --- |
| P0 | accordion, tabs, file-tree, sidebar, nav-menu, dock, scrollbar, popup, drawer, cursor, slide-confirm, inline-overflow, tick-rail, tooltip, dropdown, context-menu, notification |
| P1 | breadcrumb, pagination, steps, dot-stepper, timeline, link-bar, table, list, code, transform, separator |
| P2 | spacer |

## P0 findings

### Accordion — P0

Source truth: the base accordion is separated/contained/line layout plus size, radius, and tone axes. Its panel uses `grid-template-rows: 0fr -> 1fr` over `600ms cubic-bezier(0.34, 1.8, 0.42, 1)`; the body enters from `translateY(-8px)`, `blur(6px)`, and zero opacity. The glow variant is not a glow shadow: it is a `1.5px` masked conic-gradient ring from `--spin`, faded over `300ms` and rotated continuously over `3.2s linear`. Bounce presses the whole item to `scale(0.97)`, restarts a `520ms` chevron pop (`0.4 -> 1.35 -> 1`), and opens over `620ms`. Ghost reveals a frost layer at `blur(6px) saturate(1.2)` on hover and `blur(12px) saturate(1.4)` when open. Slide rotates a plus into a minus and grows a rail while copy enters from `translateX(-18px)` after `90ms`. See `references/accordion/css/shadow/vs-accordion.css`, `vs-accordion-glow.css`, `vs-accordion-bounce.css`, `vs-accordion-ghost.css`, `vs-accordion-slide.css`, and matching `references/accordion/web-component/*.js`.

Port gap: `src/lib/registry/ui/accordion/accordion-item.svelte` uses a single height animation at the global base duration, substitutes glow with two static shadows, approximates bounce with a tiny `1.015/.995` item scale, and substitutes slide with a static left border plus a half-rem content shift. It also conflates source layout/effect axes (`filled`/`ghost` versus separated/contained/line). The docs show only default and filled+glow, so they conceal nearly every defining effect (`src/lib/docs/pages/accordion.svelte`). Restore source-specific layers and state choreography before tuning colors.

### Tabs — P0

Source truth: base tabs have a coordinate ripple lasting `720ms`, glyph-clipped `140px` pointer light, press `scale(0.92)`, and a measured indicator moving and resizing over `420ms cubic-bezier(0.34,1.4,0.64,1)` with a `460ms` `1 -> 1.099 -> 1` pop. A cloned label mask keeps text stationary while the pill passes across it. Bubble hops `translateY(-14px) scale(.8)` at 45% of `440ms`. Gooey performs union-stretch then collapse over `460ms cubic-bezier(.5,1.5,.5,1)` and paints proximity light across inactive glyphs. Neon sweeps a gradient underline for `3s linear infinite`. Chrome uses masked concave shoulders and a sampled WAAPI two-edge spring; the sled deliberately has no CSS transition. See `references/tabs/css/shadow/vs-tabs.css`, `vs-tabs-bubble.css`, `vs-tabs-gooey.css`, `vs-tabs-neon.css`, `vs-tabs-chrome.css`, and especially `references/tabs/web-component/vs-tabs-chrome.js` / `vs-tabs-gooey.js`.

Port gap: `src/lib/registry/ui/tabs/tabs-list.svelte` drives every variant through one ordinary `220ms` rectangle. Bubble is only `border-radius:999px`, gooey only a slightly irregular radius plus `blur(.3px)`, Chrome only a rounded container, and neon only static shadows. There is no ripple, label mask, hop, union stretch, pointer light, gradient sweep, or Chrome spring. `src/lib/docs/pages/tabs.svelte` shows bubble and vertical neon but does not expose the missing mechanics.

### File tree — P0

Source truth: the base tree has a measured shared selection highlight, masked proximity rim, spring chevrons (`360ms`), two icon layers that cross through `scale(.5) rotate(±15deg)` and `blur(3px)`, child collapse at `600ms`, inner content from `translateY(-6px) scale(.97)` and `blur(14px)`, and a `600ms` coordinate ripple. Compact has a sliding, glowing selection marker; glow has a `120px` pointer-following radial halo; guides light and widen the active depth guide; highlight moves one backdrop-blurred pill; reveal cascades rows from `translateX(-10px)` and `blur(4px)` over `420ms`. See `references/file-tree/css/shadow/vs-file-tree.css` and all five variant CSS files, plus `references/file-tree/web-component/vs-file-tree*.js`.

Port gap: `src/lib/registry/ui/file-tree/file-tree.svelte` switches rows in/out immediately, uses text glyphs for expand state, and reduces the five effects to static background, border, shadow, or icon opacity rules. There is no shared measured layer, pointer coordinate tracking, collapse animation, icon crossfade, ripple, stagger, or guide choreography. The docs mention guides/glow/highlight but their previews validate only labels, not source behavior (`src/lib/docs/pages/file-tree.svelte`).

### Sidebar — P0

Source truth: base/classic use a `460ms` width spring, one measured hover highlight, pointer-proximity border lighting, badges that shift `15px` for the active rail, collapsed corner indicators, and submenus whose close is `500ms cubic-bezier(.5,-.6,.5,1)` while open is `560ms cubic-bezier(.34,1.8,.5,1)` with blur/scale content. Floating and minimal become icon docks with tooltip/flyout panels; tiles hover to `scale(1.14)` and active to `1.06`. Glow is a HUD treatment with text glow and a `2.6s` scan line. Gradient drifts for `12s`, uses a full panel gradient and white glassy active rows. Rail moves a measured pill and springs subnavigation. See `references/sidebar/css/shadow/vs-sidebar.css`, `vs-sidebar-floating.css`, `vs-sidebar-glow.css`, `vs-sidebar-gradient.css`, `vs-sidebar-minimal.css`, `vs-sidebar-rail.css`, and matching web-component sources.

Port gap: `src/lib/registry/ui/sidebar/sidebar.svelte` delegates layout to the stock shadcn sidebar and adds only active background/shadow/gradient rules. It lacks the measured hover layer, pointer light, variant-specific collapsed flyouts, HUD scan, drifting gradient, source collapse geometry, submenu springs, and badges/corner-state choreography. `floating` is the only source variant previewed in `src/lib/docs/pages/sidebar.svelte`.

### Navigation menu — P0

Source truth: the base menu has a measured active pill, a viewport that enters from `scale(.96)` and blur, a measured per-link highlight inside the panel, pointer spotlights, and direction-aware content swap (`translateX(±34px) scale(.92) blur(10px)`). Variant panels enter/leave in opposite directions over roughly `320/260ms`; all use `backdrop-filter:blur(12px)`. Pill and underline move measured indicators. Spotlight follows pointer coordinates. Glow combines trigger text-shadow, radial aura, ring shadows, and a `2.4s` breathing layer. Mega staggers cards with a `420ms` rise. See `references/nav-menu/css/shadow/vs-nav-menu.css`, all variant CSS, and `references/nav-menu/web-component/vs-nav-menu*.js`.

Port gap: `src/lib/registry/ui/nav-menu/nav-menu.svelte` is one stock navigation-menu surface with static open-state styles. No measured trigger/panel highlight, viewport size choreography, direction-aware swap, spotlight pointer tracking, breathing glow, or stagger exists. `mega` is represented only by a larger `min-width`. Docs show only mega (`src/lib/docs/pages/nav-menu.svelte`).

### Dock — P0

Source truth: source docks run continuous per-item pointer physics, not independent CSS scale alone. The variants add distinct systems: aurora has two blurred masked layers at `17s` and `23s` plus pointer halo; bounce squashes icons `1.1/.86 -> .97/1.06 -> 1` over `320ms`; glass tilts the whole bar with pointer-written rotations and sheen; gooey has leading and lagging blobs with separate `380ms` and `620ms` curves; magnet writes translation, rotation, and scale; neon registers `--lit`, applies multi-stage filters, pulses over `2.8s`, and moves a glow rail. See `references/dock/css/shadow/vs-dock*.css` and `references/dock/web-component/vs-dock*.js`.

Port gap: `src/lib/registry/ui/dock/dock.svelte` computes only scalar magnification from one axis. Aurora is a static three-stop background, gooey a `drop-shadow`, glass a background alpha, neon one box-shadow, and bounce a 7px vertical hop. There are no layered auroras, blob head/tail, bar tilt, sheen, magnetic displacement/rotation, active rail, or spring-reset behavior. Docs show glass and neon, but neither is source-faithful (`src/lib/docs/pages/dock.svelte`).

### Scrollbar — P0

Source truth: this is a custom physics scrollbar, including embedded/bare/page modes. The thumb follows with configurable smoothing (`.18` default), a ghost follows at `.42` of that rate, width grows while hovered/dragged, auto-hide waits `900ms`, and overscroll injects velocity into a damped spring that squashes to at most `.65` and moves up to `22px`. Track clicks smooth-scroll; thumb dragging uses pointer capture; ResizeObserver and page scroll/resize keep geometry current. Hidden thumb/ghost fade, shrink to `.35`, and blur `5px`. Glow breathes `2.4s`; dots wave `1.6s`; gradient flows `3.5s`. See `references/scrollbar/css/shadow/vs-scrollbar.css` and `references/scrollbar/web-component/vs-scrollbar.js`, plus the variant files.

Port gap: `src/lib/registry/ui/scrollbar/scrollbar.svelte` skins the stock scroll-area thumb. It has no ghost, smoothing, overscroll spring, page/bare modes, pointer/track choreography, hover width, shrink/blur hide, or variant animations. Static glow/gradient/dots are not equivalent.

### Popup — P0

Source truth: the modal surface sits under a `blur(6px)` overlay and has distinct enter and leave curves. Zoom is `scale(.88)` with `420ms cubic-bezier(.34,1.56,.64,1)` enter and `200ms cubic-bezier(.4,0,1,1)` leave. Flip starts at `rotateX(-85deg) translateY(-20px)` over `460ms`; slide-up comes from `translateY(110%)` over `460ms cubic-bezier(.22,1,.36,1)` and leaves over `240ms`; bounce starts `translateY(24px) scale(.9)` and enters over `560ms cubic-bezier(.3,1.8,.5,1)`. The base source also has a pointer-proximity masked panel ring and explicit body-scroll layouts. See `references/popup/css/shadow/vs-popup*.css` and web-component sources.

Port gap: `src/lib/registry/ui/popup/popup.svelte` applies open-only keyframes to a stock dialog: zoom starts at `.82`, flip at `-55deg`, slide at only `2rem`, and close falls back to primitive behavior. It omits overlay-specific timing, proximity ring, base sizing/scroll layers, and source leave choreography. Confirm uses the same approximation (`confirm-popup.svelte`).

### Drawer — P0

Source truth: Drawer is a six-treatment family, not just placement. Base springs open while measuring width/height and leaves with a deliberate wall-bounce (`0 -> 100% at 60% -> 90% at 78% -> 100%`, `500ms`). Bounce enters with five translation stops (`100, -6, 3, -1.5, 0%`). Blur de-blurs from `16px` and moves `8%` over `420ms`; glass uses `blur(18px) saturate(160%)` and frost strengths; push coordinates a `380ms` body displacement; gradient uses a `140px` feather instead of dim overlay or shadow. See `references/drawer/css/shadow/vs-drawer.css`, `vs-drawer-bounce.css`, `vs-drawer-blur.css`, `vs-drawer-glass.css`, `vs-drawer-push.css`, `vs-drawer-slide.css`, and web-component sources.

Port gap: `src/lib/registry/ui/drawer/drawer.svelte` exposes no variant/effect API at all and relies on stock Sheet motion. None of the source treatment layers, push behavior, measured spring, gradient feather, or wall-bounce exists. The docs test placement and overlay only (`src/lib/docs/pages/drawer.svelte`).

### Cursor — P0

Source truth: each cursor is a different renderer. Base uses separate dot and lagging ring. Blend uses current velocity to rotate/squash a primary disc and a slower ghost and grows over `[data-cursor-grow]`. Blob derives anisotropic stretch from velocity (`sensitivity .015`, max `.9`). Glow is a canvas renderer with a 40-sample trail, additive compositing, velocity-oriented particles, and glow sprite. Label morphs a 10px dot into a 40px pill over `[data-cursor-text]`. Magnet snaps a plate to target geometry. Reticle resizes to target bounds and spins a ring over `7s`. See every file under `references/cursor/web-component/` and `references/cursor/css/shadow/`.

Port gap: `src/lib/registry/ui/cursor/cursor.ts` renders one bordered div for every variant and changes only radius, shadow, blend mode, label, or target coordinates. It has one `.62` lerp, no velocity shape, ghost, canvas trail, target-bound reticle, label morph, or magnet plate. The API also invents selectors/data names that do not mirror source contracts. Docs show only a bounded default preview (`src/lib/docs/pages/cursor.svelte`).

### Slide confirm — P0

Source truth: drag position drives fill and two opposing labels; velocity stretches the knob via `--sx/--sy`; release is solved with configurable stiffness `260` and damping `17`; the default threshold is `.9`; ResizeObserver recomputes travel; pointer capture handles drag/cancel. The knob is a grab surface with layered shadow, its arrow and tick cross through `scale(.7)`, and keyboard confirms on Right/End/Enter/Space and resets on Left/Home/Escape. See `references/slide-confirm/css/shadow/vs-slide-confirm.css` and `references/slide-confirm/web-component/vs-slide-confirm.js`.

Port gap: the Svelte component has solid functional pointer and keyboard coverage, but `src/lib/registry/ui/slide-confirm/slide-confirm.svelte` changes the default threshold to `.85`, omits Escape/Left reset, and settles through fixed CSS transitions rather than the reference spring/velocity deformation. It lacks the knob squash/stretch, gradient depth, source glow layer, opposing label opacity formulas, and source shadow hierarchy. Treat this as visual/physics P0 even though behavior tests pass.

### Inline overflow — P0 (wrong component model)

Source truth: `VsInlineOverflow` is a fixed set of action pills that expands/collapses in place. A More/Close trigger changes the shell width while hidden pills fly out from behind it. Separate spring solvers drive shell and track (`stiffness 260`, `damping 17`, lag `.45`); children stagger `45ms`, velocity blur defaults to `5px`, squash to `.045`, and wrapper/item/pill transforms are intentionally isolated. The glyph crossfades while rotating ±90 degrees. Escape collapses. See `references/inline-overflow/css/shadow/vs-inline-overflow.css` and `references/inline-overflow/web-component/vs-inline-overflow.js`.

Port gap: `src/lib/registry/ui/inline-overflow/inline-overflow.svelte` implements responsive width overflow into a dropdown. That is useful but it is not the referenced component. It has none of the open state, in-place pill reveal, spring/lag/stagger/blur/squash system, rotating trigger glyph, or source API. This should be replaced or renamed rather than incrementally styled.

### Tick rail — P0 (wrong component model)

Source truth: `VsTickRail` is a vertical edge-navigation rail of clickable ticks paired with a floating information card, not a numeric range input. The hot tick expands from `10px` to `27px` (md) with `18px` row gap; the card is `252px`, offset `18px`, and follows with spring lag. Per-frame transforms magnify nearby ticks; the hot layer glows `0 0 10px / .55`. Two stacked copy layers hand off through `translateY(±7px)`, `blur(7/6px)`, a `90ms` entrance delay, and different exit durations while JS springs card height to content. See `references/tick-rail/css/shadow/vs-tick-rail.css` and `references/tick-rail/web-component/vs-tick-rail.js`.

Port gap: `src/lib/registry/ui/tick-rail/tick-rail.svelte` is a native `<input type="range">` with a repeating-linear-gradient ruler. Its API, geometry, semantics, pointer behavior, card, magnification, and motion do not correspond to the source. Replace from the reference contract.

### Tooltip — P0

Source truth: variants are fade, blur, glow, scale, and slide—not default/border/shadow. Base enters with `blur(8px) scale(.7)`, overshoots to `1.04`, and exits through a brief `1.05` expansion to `scale(.6) blur(8px)`; content swaps blur and scale over `400ms`; arrow has its own `0 -> 1.3 -> .92 -> 1` pop over `420ms`. Blur starts at `10px`; scale starts `.7`; slide translates `8px` by side; glow fires a `620ms` flare. See `references/tooltip/css/shadow/vs-tooltip.css` and each variant CSS/WC file.

Port gap: `src/lib/registry/ui/tooltip/tooltip.svelte` only skins the official tooltip with three surface variants and inherits generic primitive animation. It lacks the source variant API, enter/exit asymmetry, content swap, arrow pop, blur/slide/scale choreography, and flare. The docs currently advertise the non-source border/shadow variants (`src/lib/docs/pages/tooltip.svelte`).

### Dropdown — P0

Source truth: variants are blur, fold, glow, slide, and spring. Fold uses `rotateX(±92deg)` panel exit and item flips from `perspective(600px) rotateX(-80deg)`. Blur starts at `blur(14px) translateY(-6px) scale(.98)` and staggers item focus. Glow ignites from `translateY(-8px) scale(.98)`, pulses an aura for `900ms`, and gives highlighted rows inset/outset rings. Slide combines translation and `clip-path` wipe; spring opens from `scale(.4)` and staggers spring rows. Trigger caret rotates `180deg` and spring trigger compresses to `.96`. See `references/dropdown/css/shadow/vs-dropdown*.css` and matching web components.

Port gap: `src/lib/registry/ui/dropdown/dropdown.svelte` has no variant prop. It provides click/hover opening and a generic menu surface only; its animation duration fields do not define any keyframes or source panel/row choreography. Tone-specific highlighted rows, caret/open styling, and source geometry are missing. Docs cover only trigger modes (`src/lib/docs/pages/dropdown.svelte`).

### Context menu — P0

Source truth: the base opens from the click origin at `scale(.04) blur(10px)` over `520ms cubic-bezier(.34,1.5,.4,1)`, leaves at `scale(.4) blur(8px)`, slides one measured active-row highlight, and staggers rows by `48ms + 120ms`. Spring starts at `.2`; slide staggers from `translateX(-18px)`; blur reveals from `blur(6px) translateY(4px)`; radial grows `clip-path:circle(0 -> 150%)` from `--iris`; glow pulses its halo for `2.4s` and sweeps active rows over `620ms`. See `references/context-menu/css/shadow/vs-context-menu*.css` and web components.

Port gap: `src/lib/registry/ui/context-menu/context-menu.svelte` supports only default/radial, but radial has no radial CSS at all. Both are the same official context-menu surface. There is no click-origin transform, clip iris, row stagger, measured highlight, spring/slide/blur family, glow pulse, or sweep. `src/lib/docs/pages/context-menu.svelte` therefore labels a standard rectangle as radial.

### Notification — P0

Source truth: base notification is a morphing goo/pill system: container height springs, entry lasts `720ms` with blur fade, exit scales to `.86` and blurs, content expands from the head with a `90ms` delay, and title swaps blur over `360ms`. The family variants also have unique placement/motion: banner enters from `translateY(-100%)` over `460ms`; card and glow enter from `translateX(120%)` over `440ms`; snackbar rises from `140%` over `460ms`; glow pulses the icon halo at `1.8s`. See `references/notification/css/shadow/vs-notification.css` and all variant CSS/WC files.

Port gap: `src/lib/registry/ui/notification/notification.svelte` uses one Svelte `fly` transition for all variants and changes mostly static borders/shadows/layout. It lacks morphing pill/body geometry, goo filters, blur/scale entrance/exit, title handoff, per-variant direction/timing, icon pulse, and stack-position transitions. Progress/timer pause is implemented, but source presentation is not. Docs exercise the API broadly, which makes this especially visible (`src/lib/docs/pages/notification.svelte`).

## P1 findings

### Breadcrumb — P1

Source truth: base separators spring over `620ms` and clicks create an `1820ms` expanding radial drop using registered `--bc-r`. Arrow crumbs are real clip-path chevrons and move `3px` on hover. Collapse reveals crumbs from `translateX(-6px) scale(.9)` and makes three ellipsis dots bob over `1200ms`. Glow flickers text for `1600ms` and lights the separator; slash grows a text underline and skews the slash from `-8deg` to `-16deg`; pill hovers to `scale(1.06)` with an inset ring. See `references/breadcrumb/css/shadow/vs-breadcrumb*.css`.

Port gap: `src/lib/registry/ui/breadcrumb/breadcrumb.svelte` changes characters/backgrounds and adds one current-page shadow. Arrow is not a clipped chain, collapse has no reveal/bobbing dots, glow is static and on current rather than hover/focus, and no click drop exists. Docs cover pill/slash/glow but not their motion (`src/lib/docs/pages/breadcrumb.svelte`).

### Pagination — P1

Source truth: base mirrors the sophisticated tabs system: coordinate ripple, glyph light, cloned number mask, measured `420ms` indicator, and `460ms` `1.099` pop. Compact rolls digits through ±100% with `blur(7px)`. Gooey stretches a shared blob and wobbles at 22/55%; ink moves a masked underline in a side-faded reel; segments fill current progress via `scaleX(0 -> 1)` over `520ms`; dots use compact geometry and glow. See `references/pagination/css/shadow/vs-pagination*.css` and web components.

Port gap: `src/lib/registry/ui/pagination/pagination.svelte` renders independent buttons and approximates variants with border radii, one shadow, or active scale. There is no shared indicator/mask, digit reel, goo stretch, ink rail, segment fill animation, coordinate ripple, or pointer light.

### Steps — P1

Source truth: base has progressive line fills, ring stroke animation delayed `380ms`, icon/number blur crossfade, marker scale, and coordinate ripple. Arrow uses actual clip-path connected arrows; bar animates a shared width over `520ms`; circular is an SVG progress ring (`620ms`); pills expand the active item and reveal its label via `max-width` over `460ms`; timeline fills each vertical connector via `scaleY` over `480ms`. See `references/steps/css/shadow/vs-steps*.css`.

Port gap: `src/lib/registry/ui/steps/step.svelte` uses static marks and connectors. Arrow is a rounded rectangle, circular is still a small circle, active pills do not expand/reveal, and connectors switch instantly. No ring, ripple, icon crossfade, or transition choreography is implemented. Docs do not name/show each variant explicitly (`src/lib/docs/pages/steps.svelte`).

### Dot stepper — P1

Source truth: bars change length with a `380ms` spring; elastic moves a shared indicator and makes near dots `scale(1.25)`; glow pulses dot and halo over `1600ms`; ring is a masked conic ring spinning at `2400ms`; worm stretches along travel direction before collapsing; base has press `scale(.8)`, progress fill, pointer light, and ripple. See `references/dot-stepper/css/shadow/vs-dot-stepper*.css` and web components.

Port gap: `src/lib/registry/ui/dot-stepper/dot-stepper.svelte` reduces each effect to active dot width/scale/shadow and a fixed-distance worm translation (`1.85rem`). There is no measured shared indicator, near response, pulse/halo, conic spin, directional stretch, fill/ripple, or vertical source behavior.

### Timeline — P1

Source truth: base items reveal over `560ms` from `translateY(14px) scale(.86) blur(8px)`, overshoot `1.04`, dots pop, and pointer proximity lights each dot. Alternating enters from opposite ±16px sides and animates progress height. Cards lift `3px` with shadow. Compact can reveal description on row hover. Glow pulses the active halo over `1800ms`. Gradient includes a `620ms` progress beam, `2600ms` travelling sheen, breathing head, and `1600ms` conic active ring. See `references/timeline/css/shadow/vs-timeline*.css`.

Port gap: `src/lib/registry/ui/timeline/timeline.svelte` is almost entirely static. Glow is one dot shadow and gradient is one rail gradient; statuses/progress, reveal animation, pointer light, card lift, hover reveal, travelling sheen, beam/head, and conic ring are absent.

### Link bar — P1

Source truth: underline and pill use measured moving indicators; slide swaps two underline layers vertically; glow pulses active text for `2400ms`; magnet moves the indicator over `380ms` and JS displaces nearby links rather than lifting only the hovered one. Base also has hover line scale and a moving active indicator. See `references/link-bar/css/shadow/vs-link-bar*.css` and web components.

Port gap: `src/lib/registry/ui/link-bar/link-bar.svelte` at least measures one indicator, but all variants share it. Glow is only a box-shadow, slide has no line swap, and magnet is just `translateY(-2px)` on the hovered anchor. Source separators, proximity displacement, per-variant timing, and active pulse are missing.

### Table — P1

Source truth: the base has animated sort arrows, sticky region, selection check stroke-dash animations, row ripple, shimmer skeleton, and a deliberate responsive card conversion. Cards lift cells `2px`; glow uses a pointer-position radial surface and inset row glow; minimal grows per-cell underlines; striped grows an accent rail. See `references/table/css/shadow/vs-table*.css` and web components.

Port gap: `src/lib/registry/ui/table/table.svelte` has strong data behavior and mobile cards, but the sort glyph is static, row interaction/ripple is absent, cards have no lift, glow is an outer static shadow rather than pointer/row light, minimal has no hover underline, and striped has no accent rail. Keep TanStack v9 behavior and replace only presentation/interaction layers.

### List — P1

Source truth: base includes drag/reorder springs at `460ms`, swipe-action widths on the same spring, grab state, row collapse/removal, and focus/hover layers. Cards tilt in 3D from pointer coordinates and lift shadow; glow has a pointer radial halo; hover moves one row while dimming siblings; reveal staggers every row from `translateX(-14px)`; stripe moves one shared selection marker. See `references/list/css/shadow/vs-list*.css` and web components.

Port gap: `src/lib/registry/ui/list/list.svelte` provides selection and keyboard navigation but no reorder/swipe/removal mechanics. Cards are static, glow is applied only to selected, hover is a simple `translateX(.25rem)` with no sibling dim, reveal affects trailing content rather than staggered rows, and stripe is nth-child coloring rather than a moving marker.

### Code — P1

Source truth: gradient-border is a masked conic frame rotating over `6s`; glow is a pointer-following radial spot with active border; terminal caret blinks at `1s steps(2,start)`; window tilts `rotateX(6deg) rotateY(-5deg) translateZ(14px)` with deeper shadow; minimal swaps language label for copy control on hover. Base copy presses to `.9`, floating copy uses `backdrop-filter:blur(6px)`, and line highlight includes a 2px rail. See `references/code/css/shadow/vs-code*.css` and web components.

Port gap: `src/lib/registry/ui/code/code.svelte` has syntax/data functionality, but variants are static. Gradient border does not rotate, glow does not follow pointer, terminal has no caret, window has no 3D tilt, minimal does not hover-swap controls, and copy has no source interaction. Docs show variants without the defining motion (`src/lib/docs/pages/code.svelte`).

### Transform — P1 (contract mismatch)

Source truth: these references are trigger + overlay/panel components rather than a generic child transition. Fade includes a blurred overlay and panel from `blur(8px) translateY(8px)`; flip supports X/Y `88deg` with distinct `420/240ms` enter/leave; scale enters from `.6` with spring; slide keeps mounted visibility/pointer choreography and moves `14px`; expand uses a `340ms` top-down clip wipe. See `references/transform/css/shadow/vs-transform*.css` and web components.

Port gap: `src/lib/registry/ui/transform/transform.svelte` is a useful generic transition wrapper, but uses linear easing despite importing `RX_EASE`, maps flip only to `rotateY(75deg)`, expand to a symmetric `48%` inset, slide to `12px`, and has no overlay/panel/actions. Decide whether to restore the source contract or rename this abstraction; merely changing timing will not establish parity.

### Separator — P1

Source truth: source variants include flow, glow, gradient, icon, and zigzag. Flow marches repeated dashes; gradient sweeps for `3s`; glow pulses over `2.8s`; icon rotates over `6s`; zigzag drifts for `3.5s`. Label alignment and vertical masks are part of every variant. See `references/separator/css/shadow/vs-separator*.css`.

Port gap: `src/lib/registry/ui/separator/separator.svelte` exposes solid/dashed/dotted/gradient and all are static. It lacks source variant names, speeds, animations, icon layer, zigzag geometry, masked label fades, and vertical labelled rendering. This is a smaller implementation than the P0 families but a large variant-coverage miss.

## P2 finding

### Spacer — P2

Source truth: the real spacer is invisible, defaults to `flex: var(--vs-flex,1) 1 0%`, stretches cross-axis, and becomes exact `flex:0 0 var(--vs-size)` when sized. Demo mode alone renders a 45-degree hatched placeholder. See `references/spacer/css/shadow/vs-spacer.css` and `references/spacer/web-component/vs-spacer.js`.

Port gap: `src/lib/registry/ui/spacer/spacer.svelte` supports explicit width/height and optional `flex-grow:1`, but does not set the source default flex basis/shrink/stretch semantics or the single `size` axis. No motion is missing; align the flex contract and optionally expose docs-only demo visualization.

## Cross-family implementation requirements

The fidelity repair should use the following rules across all lanes:

1. Preserve each source family’s two-axis API when it has one. Do not collapse layout variants and effect variants into the same enum.
2. Reproduce the source layer stack. A conic masked ring cannot be replaced by `box-shadow`; a shared measured highlight cannot be replaced by per-item backgrounds; a goo head/tail cannot be replaced by an irregular border radius.
3. Port pointer engines as Svelte attachments with complete teardown. Use source radius, falloff, lerp/spring constants, velocity, and rAF batching.
4. Port measurement engines with `ResizeObserver`, font-ready remeasurement, and state-change observation where present. Interrupt/re-target in-flight motion from computed geometry rather than snapping.
5. Preserve enter and leave separately. Do not rely on stock shadcn/bits defaults when source timing is specified.
6. Use the source reduced-motion behavior, which often retains opacity/color feedback while removing travel, blur, continuous loops, or transforms.
7. Keep the shadcn-svelte primitive for semantics/focus/dismissal where appropriate, but render Resax-owned visual layers around or inside it.
8. Add interaction tests for pointer coordinates, resize/re-target, open/close timing classes, and reduced motion. Static screenshots alone will not catch these regressions.

## Docs coverage gaps

The current pages usually show one or two named variants and frequently validate only static rest state. Every repaired family needs, at minimum:

- one gallery containing every source variant at rest;
- an interaction strip showing hover, pointer proximity, press, active/open, and close where applicable;
- a motion comparison for normal and reduced motion;
- resize/reflow examples for measured indicators, overflow, scrollbars, sidebar, file tree, and tables;
- pointer/drag examples for dock, cursor, slide-confirm, scrollbar, list, and tick-rail;
- explicit source-named controls rather than port-invented names (notably tooltip, dropdown, drawer, separator, inline-overflow, tick-rail, and transform).

The highest-risk misleading demos today are `src/lib/docs/pages/context-menu.svelte` ("radial" without iris geometry), `tick-rail.svelte` and `inline-overflow.svelte` (different component models), `drawer.svelte` (family effects absent), and the glow demos throughout (static shadow substituted for animated/masked/pointer light).

## Test coverage gaps

The existing tests are primarily API and accessibility smoke tests. Examples: `phase-4b.svelte.test.ts` verifies step state, labelled dots, timeline list semantics, and file-tree keyboard traversal; `phase-4c.svelte.test.ts` verifies LinkBar selection, Dock listener cleanup, and sidebar/nav/scroll-area semantics; `phase-5a.svelte.test.ts` verifies table sorting/selection and list keyboard behavior; `poppers.svelte.test.ts` verifies opening/closing and roles; `phase-5c.svelte.test.ts` currently enshrines the incorrect range-slider TickRail and responsive-dropdown InlineOverflow contracts. `cursor/cursor.test.ts` checks overlay cleanup, not rendering mechanics. `slide-confirm.svelte.test.ts` checks threshold/keyboard/resize state, not velocity or spring output.

No current unit test proves the source-defining conic rings, masks, pointer-coordinate falloff, leading/trailing indicator geometry, variant enter/leave values, row stagger, blur handoff, spring integration, magnetic displacement, overscroll deformation, or continuous-loop timing. The incorrect TickRail and InlineOverflow tests must be replaced with source-contract tests rather than preserved during the rewrite.

## Recommended repair order

1. Correct the wrong-contract components: tick-rail, inline-overflow, transform decision, drawer API, tooltip/dropdown variant APIs.
2. Establish shared fidelity utilities: proximity glow attachment, ripple attachment, measured moving-layer attachment, spring solver, and transition-state helpers.
3. Repair accordion/tabs/sidebar/nav-menu/file-tree first; they define the visual language and expose the wrong-glow problem most clearly.
4. Repair pointer/physics components: dock, cursor, scrollbar, slide-confirm.
5. Repair overlay choreography: popup, drawer, tooltip, dropdown, context-menu, notification.
6. Apply the shared mechanisms to pagination/steps/dot-stepper/timeline/link-bar/table/list/code/separator.
7. Rebuild docs interactions and record deterministic visual plus motion tests only after each family matches its raw reference.
