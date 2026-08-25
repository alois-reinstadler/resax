# Source-fidelity audit: inputs, actions, and display

Date: 2026-08-25
Scope: source audit only; no implementation changes
Authorization: `references/AUTHORIZATION.md`

## Closure addendum — 2026-08-25

The P0/P1 findings below record the pre-parity baseline and are retained as source-audit history. The following families have since been re-audited against their organized references and closed:

- **Button:** all 13 source variants now have dedicated renderer mechanics. Invalid unit-bearing relative-HSL caps were removed, arbitrary colors retain their own foreground/hover palette, and source foregrounds are restored wherever they remain accessible. The accepted WCAG deviations are narrow: semantic success/danger/warn solid fills use invariant `rgb(var(--rx-fixed-dark))`; base hover changes only the background instead of fading the whole element to `.85`; light-mode border-draw and the compatible flat/border/transparent axes use contrast-safe ink. Dark border-draw retains the source fixed-light hover. Evidence: `src/lib/registry/ui/button/button.svelte.test.ts` and the Button visual/Axe fixtures.
- **Chip:** base/default now uses the source `.12` soft tint and `.2` border, selected default reaches `.95`, bounce/glow reach `.9`, fill reaches `.95`, and source hover, glyph, height, click-restarted bounce, fill, glow, gradient, and outline choreography are present. The invalid relative-HSL fallback was removed. There is no retained source deviation. Evidence: `src/lib/registry/ui/chip/chip.svelte.test.ts` and `chip-test-harness.svelte`.
- **Calendar:** base and compact keep their single moving selection chip. The selected cell is transparent only while the chip travels, then receives an identical fill after the exact `400ms`/`320ms` handoff. SSR/static output starts filled, rapid reselection cancels the prior handoff, and reduced motion settles immediately. This delayed underfill is an accepted accessibility deviation from the source's chip-only fill. Evidence: `src/lib/registry/ui/calendar/calendar.svelte.test.ts`.
- **Skeleton:** the source API/default is restored: a three-line text skeleton by default, `shape="card"`, `count`, width/height/radius, speed and animation axes, 14px text bones, 120px rectangles, stagger, and one container-wide `100cqw` sweep. Existing compatibility props remain additive. There is no retained source deviation. Evidence: `src/lib/registry/ui/skeleton/skeleton.svelte.test.ts` plus the existing visual-feedback suites.
- **Alert:** the source's additive base axes are exposed as `appearance="soft|solid|outline"` and `radius="subtle|rounded|pill"`. Base, Split, Toast, and timeout geometry now use the audited 440/400px widths, 13/14px padding, 54/34px icon treatments, accent title, and 3px rail while keeping the already ported motion/glow systems. There is no source-fidelity deviation; the semantic solid foreground follows the same documented WCAG ink policy as Button. Evidence: `src/lib/registry/ui/feedback.svelte.test.ts`.

Accordingly, the priority tables and “Port gap” statements later in this document describe the original audit state, not the final implementation state. Machine-readable final classifications and accepted deviations live in `docs/FIDELITY-LEDGER.json`.

## Verdict

This lane is not source-faithful. Most components reproduce the component category and a generic Resax skin, but not the defining Vuesax interaction system. The largest gap is not token choice: it is missing DOM layers, state machines, pointer-coordinate variables, composited gradients, and per-variant timing. The current glow treatment is especially inaccurate. A static `box-shadow` or `drop-shadow` is not equivalent to the source's masked, pointer-positioned radial border light.

Priority means:

- **P0** — the public variant is absent, aliased to a different animation, or its signature interaction/glow mechanism is missing.
- **P1** — recognizable structure exists but exact stops, shadow stack, choreography, timing, or state behavior is wrong.
- **P2** — polish mismatch that can follow the structural/motion work.

## Cross-cutting source mechanisms that must be ported literally

### Pointer proximity glow (P0)

The canonical source glow is a padded pseudo/child ring masked to the border, not a whole-element shadow. Its standard two layers are:

```css
radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),
  rgb(var(--fx-tint)/.6), rgb(var(--fx-tint)/.42) 30%,
  rgb(var(--fx-tint)/.16) 58%, rgb(var(--fx-tint)/0) 82%),
radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),
  rgb(var(--fx-tint)/.6), rgb(var(--fx-tint)/.27) 42%,
  rgb(var(--fx-tint)/.08) 66%, rgb(var(--fx-tint)/0) 85%)
```

The layer uses `padding:1px`, the two-mask `content-box`/full-box exclusion, `opacity:calc(var(--glow)*.9*.7)` (component strength varies), and `opacity 140ms`. Pointer code updates `--gx`, `--gy`, and `--glow` from `getBoundingClientRect()` and pointer position. See `references/button/css/shadow/vs-button.css`, `references/button/web-component/vs-button.js`, `references/number/css/shadow/vs-number.css`, `references/chip/css/shadow/vs-chip.css`, `references/upload-file/css/shadow/vs-upload-file.css`, `references/color-picker/css/shadow/vs-color-picker-compact.css`, and `references/alert/css/shadow/vs-alert.css`.

Several bases also accept neighboring lamps through separate `--lit-fill`, `--lit-ring`, `--lit`, and `--lit-fill-amt` layers. These fade in/out over `140ms` and must not be collapsed into the cursor's `--glow`. The port has no equivalent neighbor-light graph.

### Click ripple (P0)

The common source ripple is pointer-originated, sized to cover the element, and has five radial falloff stops: `.38` at `0%`, `.20` at `24%`, `.09` at `44%`, `.03` at `60%`, transparent at `76%`. Scale and fade run concurrently for `780ms` using `cubic-bezier(.22,1,.36,1)` and `cubic-bezier(.25,.1,.25,1)`, from `translate(-50%,-50%) scale(0)` to `scale(1)` and opacity `.8` to `0`. See `references/button/css/shadow/vs-button.css`, `references/chip/css/shadow/vs-chip.css`, `references/badge/css/shadow/vs-badge.css`, and `references/alert/css/shadow/vs-alert.css`. Checkbox/radio use a related two-ripple 620/460ms sequence with the second delayed `90ms`; their source files are cited below.

### Timing vocabulary (P0/P1)

The source repeatedly distinguishes:

- spring press/settle: `cubic-bezier(.34,1.56,.64,1)` or the stronger `.34,1.7,.5,1` / `.34,1.8,.5,1`;
- ease-out: `cubic-bezier(.22,1,.36,1)`;
- symmetric material: `cubic-bezier(.4,0,.2,1)`;
- collapse exits: `cubic-bezier(.5,-.45,.55,1)`;
- native-looking overshoot in base checkbox/radio: a 620ms CSS `linear(...)` curve with 18 sampled stops.

The port's global `--rx-duration`/`--rx-ease` erases these distinctions. Reduced-motion branches in the references remain mandatory; fidelity does not mean ignoring accessibility.

## Coverage and public API mismatch

| Component | Source variants | Current port | Result |
|---|---|---|---|
| Button | base, border-draw, chrome, glitch, gooey, gradient, invert, liquid, magnetic, plasma, push, shine, v2 | default/flat/border/gradient/shadow/relief/transparent + glow/pulse effects | **P0:** 10 signature variants absent; names imply unrelated effects |
| Input | base, filled, gradient-border, pulse, spotlight, underline | adds generic shadow/border; names otherwise present | **P0/P1:** all signature layers simplified; spotlight does not track pointer |
| Textarea | base, code, filled, gradient-border, spotlight, underline | adds shadow/border/pulse; names otherwise present | **P0/P1:** source masks/pointer spotlight/spinning border absent |
| Select | base, floating, pill, search, slide, underline | same names | **P0:** visual names exist but menu and option choreography are generic |
| Checkbox | base, bounce, card, fill, flip, neon | no variant prop | **P0:** five variants and base liquid/ripple choreography absent |
| Radio | base, bounce, card, fill, glow, ring | no variant prop | **P0:** all source variants collapsed to one dot scale |
| Radio group | base, cards, glow, pill, segment, slide | no variant prop | **P0:** moving indicators and card/group effects absent |
| Switch | base, day-night, dot, glow, label, liquid, material | no variant prop | **P0:** all signatures collapsed to one translating thumb |
| Slider | base, fluent, glow, gradient, ripple, stepped, stops, ticks | no variant prop | **P0:** all variant mechanics absent |
| Calendar | base, compact, dots, glow, minimal, range-fill | no variant prop | **P0:** selection/highlight systems absent |
| Number | base, glow, roll-digits, segment, slider, stepper | one generic input-number | **P0:** all source display/transition modes absent |
| OTP | base, dots, filled, flip, glow, underline | one generic cell style | **P0:** variants absent |
| Rating | base, bars, emoji, glow, hearts, numbers | one star style | **P0:** five renderers absent |
| Upload file | base, button, compact, dropzone, gallery, glow | one generic dropzone/list | **P0:** five variants absent and base state collapse differs |
| Chip | base, bounce, fill, glow, gradient, outline | default/flat/border/gradient | **P0:** bounce/fill/glow/outline missing; gradient wrong |
| Color picker | base, compact, palette, ring, slider, swatches | one generic area/rails/swatches | **P0:** five interaction layouts absent |
| Card | base, asset, glow, gradient-border, lift, slider, spotlight, tilt-3d | default/shadow/border/flat/reveal/zoom/spotlight/tilt-3d | **P0/P1:** source asset/glow/gradient/lift/slider absent; spotlight and tilt are non-tracking approximations |
| Avatar | base, glow, ring, squircle, status, tilt | history/loading/shape/badge | **P0:** source variants absent |
| Avatar group | base, fan, flip, grid, ring, wave | overlap + optional float | **P0:** all group variants absent |
| Badge | base, glow, gradient, pulse, shimmer, stripes | same names | **P1:** full names exist; exact stacks/timing and base pointer effects differ |
| Indicator | base, bounce, odometer, ping, ring, shake | dot/ring/pulse/count/odometer/icon/border | **P0:** bounce/shake absent; ring/ping/odometer are approximations |
| Progress | base, circular, glow, gradient, segments, striped | shape line/circle + default/glow/gradient/segments/striped | **P1:** names covered, exact compositing/timing wrong |
| Spinner | base, bars, bounce, comet, dots, flip, grid, orbit, pulse, ring, wave | source names are aliases to unrelated generic primitives | **P0:** aliases are explicitly non-faithful |
| Skeleton | base, blink, gradient, pulse, shine, wave | same names | **P1:** distinct algorithms collapsed to shared shimmer |
| Alert | base, banner, inline, neon, split, toast | same names | **P0/P1:** layouts exist; source enter/exit, timeout and glow systems absent |
| Ask AI button | one signature component | simplified animated gradient | **P0:** seven drifting fields/parallax/shine/ripples/twinkles missing |
| Button group | one layout component | flex wrapper | **P2:** verify geometry; source has no independent signature CSS |
| Split button | one liquid segment component | two ordinary buttons/dropdown | **P0:** liquid bridge and label choreography absent |

## Variant/state ledger — actions and text inputs

Every path below is under `references/<component>/css/shadow/`; associated event/state logic is in the same basename under `web-component/`. Compiled Vue fixtures under `compiled/vue/` confirm the externally exercised props and state transitions.

### Button — all source variants are P0 until independently rendered

- **base** (`references/button/css/shadow/vs-button.css`): 240ms spring transform, 200ms background/border/opacity, active `scale(.97)`, pointer/neighbor masked rings, 780ms dual ripple, `.7s linear` loader. Borderless labels use `drop-shadow(0 0 5px …/.7)` and opacity `.5 + .5*--glow`. Current `translateY(-1px)` + `0 6px 16px` hover is not this behavior.
- **border-draw** (`references/button/css/shadow/vs-button-border-draw.css`): conic ring `from -90deg`, typed angle `--bd-a`, `560ms cubic-bezier(.65,0,.35,1)`, opacity entry `120ms`; hover shadow `0 0 22px -8px color-mix(...70%)`, active `.98`.
- **chrome** (`references/button/css/shadow/vs-button-chrome.css`): multi-stop conic metal rim (hi/cool/mid/deep/warm/lo sequence at 0,5,11,18,25,27,36,40,45,50,55,58,65,70,76,79,85,93,100%), dynamic conic streaks, blur proportional to border width, `--chr-f 400ms`, blend `900ms linear`, and 760ms ripple. Needs pointer-driven angle/proximity logic from `references/button/web-component/vs-button-chrome.js`.
- **glitch** (`references/button/css/shadow/vs-button-glitch.css`): two clipped duplicate labels; `bgl-glitch-a/b` run `560ms steps(2,end) infinite` only in active hover state; cyan/magenta rim shadow `0 0 0 1px rgba(255,0,200,.25), 0 0 18px -6px rgba(0,240,255,.5)`; press `translateY(1px)`; standard 780ms ripple.
- **gooey** (`references/button/css/shadow/vs-button-gooey.css`): SVG goo filter/animated blobs from `references/button/web-component/vs-button-gooey.js`; label spring `180ms cubic-bezier(.34,1.56,.64,1)`, press scale `.96`, radial ripple `.32/.16/.05/0` at 0/34/58/76%, 720ms scale + fade.
- **gradient** (`references/button/css/shadow/vs-button-gradient.css`): black glass shell; six 100px blurred color fields `#00d4ff/#4f46e5/#a855f7/#2563eb/#ff2ec4/#22d3ee`, each at source-specific translations, blur `12px`, 2s color transition; inner black layer changes blur `10px→0`, opacity `0→1`, scale `.95→1` over `.5s`; color field group scales `1→1.1`. Port's two-stop 135deg gradient is unrelated.
- **invert** (`references/button/css/shadow/vs-button-invert.css`): pointer-origin `clip-path:circle(var(--ink-r) at var(--ink-x) var(--ink-y))`; JS calculates radius and label stretch/translate vars; active base `.975` over `160ms cubic-bezier(.2,.8,.3,1)`. No port counterpart.
- **liquid** (`references/button/css/shadow/vs-button-liquid.css`): liquid fill height opens over `520ms cubic-bezier(.65,0,.35,1)`, surface wobble `1.7s ease-in-out infinite`, active `.97`; close reduces to `260ms ease`. No port counterpart.
- **magnetic** (`references/button/css/shadow/vs-button-magnetic.css`): pointer displacement from `references/button/web-component/vs-button-magnetic.js`; outer settle `300ms cubic-bezier(.34,1.56,.64,1)`, live tracking `90ms ease`, pointer radial wash `120% 120%` with white `.18→transparent 60%` and opacity `260ms`. No port counterpart.
- **plasma** (`references/button/css/shadow/vs-button-plasma.css`): pointer label offsets, dual-color masked `linear-gradient(105deg, secondary, primary 42% 76%, secondary)`, `drop-shadow(0 0 5px ...58%)`, active `.972`, ripple `760ms cubic-bezier(.2,.8,.3,1)`. No port counterpart.
- **push** (`references/button/css/shadow/vs-button-push.css`): source geometry is built in the web component rather than standalone CSS declarations; audit `references/button/web-component/vs-button-push.js` before implementation. Do not map it to generic relief solely because both move on press.
- **shine** (`references/button/css/shadow/vs-button-shine.css`): hover lift `translateY(-2px) scale(1.02)`, shadow `0 10px 26px -12px rgba(0,0,0,.55)`, active `.98`; sheen is 90deg five-stop gradient, moves `-220%→320%` rotated `20deg` over `760ms cubic-bezier(.3,.7,.3,1)`.
- **v2** (`references/button/css/shadow/vs-button-v2.css`): label swap translates ±100% with blur `6px`/opacity 0 over `320ms cubic-bezier(.22,1,.36,1)`; standard 780ms ripple and `.7s` loader; active `.97`.

### Input

- **base** (`references/input/css/shadow/vs-input.css`): field transform spring `260ms`; border `220ms cubic-bezier(.22,1,.36,1)`; label `240ms cubic-bezier(.34,1.4,.5,1)`; action button active `.86` with 160ms spring. `references/input/web-component/vs-input.js` also provides pointer glow. Current static bottom bar/floating label is incomplete.
- **filled** (`references/input/css/shadow/vs-input-filled.css`): hover/focus fill intensifies via `color-mix(...160%)` then `200%`; accent underline scales from center over `320ms cubic-bezier(.22,1,.36,1)`; label moves by half control height and scales `.8`.
- **gradient-border** (`references/input/css/shadow/vs-input-gradient-border.css`): masked conic ring `transparent 0deg → ring 90deg → 30% mix 180deg → ring 300deg → transparent 360deg`; visible/focused ring spins `2.4s linear`. Port uses a static 120deg two-stop background.
- **pulse** (`references/input/css/shadow/vs-input-pulse.css`): focus ping `620ms cubic-bezier(.22,1,.36,1)`, opacity `.65→0`, scale `1→1.12`; it is not a single `.5s` box-shadow midpoint.
- **spotlight** (`references/input/css/shadow/vs-input-spotlight.css`): pointer-updated `--mx/--my` radial `150px circle`, ring alpha `.16`, transparent 60%, opacity `220ms`. Port uses a fixed four-pixel focus ring and generic shadow.
- **underline** (`references/input/css/shadow/vs-input-underline.css`): line base/hover/accent with center `scaleX(0→1)` over `320ms cubic-bezier(.22,1,.36,1)`; label translates by `-(height - 14px)` and scales `.8`.

### Textarea

- **base** (`references/textarea/css/shadow/vs-textarea.css`): multi-mask border construction, 220ms border easing, 240ms label spring, and pointer tracking in `references/textarea/web-component/vs-textarea.js`. Port has one ordinary pseudo underline.
- **code** (`references/textarea/css/shadow/vs-textarea-code.css`): code background and focus `box-shadow:0 0 0 3px rgb(var(--inp-ring)/.12)`, 200ms border/shadow; no generic pulse.
- **filled** (`references/textarea/css/shadow/vs-textarea-filled.css`): rest/hover/focus fills `.06/.09/.11`, label `translateY(-16px) scale(.78)`, underline `scaleX(0→1)` over 320ms.
- **gradient-border** (`references/textarea/css/shadow/vs-textarea-gradient-border.css`): conic `from/to/from` border, opacity `.7→1`, then spins with typed angle over `3.5s linear`; inner background remains card surface. Port is a fixed linear gradient.
- **spotlight** (`references/textarea/css/shadow/vs-textarea-spotlight.css`): pointer `220px` radial, spot mix 28% at center to transparent 60%, opacity controlled by `--lit` over 260ms; logic in `references/textarea/web-component/vs-textarea-spotlight.js`.
- **underline** (`references/textarea/css/shadow/vs-textarea-underline.css`): line rest→hover→accent, center `scaleX(0→1)` 320ms; label shifts by `-(font-size + 4px)` and scales `.82`.

### Select

- **base** (`references/select/css/shadow/vs-select.css`): trigger spring 240ms; chevron spring 240ms; menu uses `blur(20px) saturate(180%)` and three-layer default shadow; placement-aware enter from `translateY(±6px) scale(.97)`, 220/240ms; options animate opacity/transform over 240/280ms; active indicator slides `280ms cubic-bezier(.34,1.42,.5,1)`.
- **floating** (`references/select/css/shadow/vs-select-floating.css`): menu `0 12px 40px rgba(0,0,0,.5)`; options enter/exit via opacity, `translateY(-6px) scaleY(.9)`, blur `6px`, 320ms strong spring and 140–160ms exit.
- **pill** (`references/select/css/shadow/vs-select-pill.css`): sliding selection indicator translates `index * 34px` over `280ms cubic-bezier(.34,1.42,.5,1)`; same 20px/180% glass menu and blur/scale close.
- **search** (`references/select/css/shadow/vs-select-search.css`): glass menu shadow adds `0 2px 8px rgba(0,0,0,.3)`; search row is transparent; options retain blur/scale choreography.
- **slide** (`references/select/css/shadow/vs-select-slide.css`): each option enters from opacity 0/`translateY(-6px)` over `300ms cubic-bezier(.22,1,.36,1)` with delay `index*26ms + 80ms`; menu close is `translateY(-8px) scaleY(.55)` + blur `8px`.
- **underline** (`references/select/css/shadow/vs-select-underline.css`): accent line center-scales over 320ms, glass menu and blurred close as above. Current select uses the same generic `.96` scale animation for every variant.

## Variant/state ledger — binary and value inputs

### Checkbox

- **base** (`references/checkbox/css/shadow/vs-checkbox.css`): checked pop `420ms cubic-bezier(.34,1.7,.5,1)` with `.86→1.14→1`; two pointer-origin ripples (620ms and 460ms, second delayed 90ms); check draw 300ms; overshoot mark transform follows the source 620ms `linear(...)`; optional dark drop/ring expands for 1820ms. Current active `.94` and single stroke transition do not reproduce it.
- **bounce** (`references/checkbox/css/shadow/vs-checkbox-bounce.css`): box pop 420ms; ping 620ms scale `1→2.1`; mark `scale(0) rotate(-12deg)→1.22 rotate(4deg)→1` over 460ms with 60ms delay; check draw 300ms with 120ms delay.
- **card** (`references/checkbox/css/shadow/vs-checkbox-card.css`): whole card active `.98`; checked background ring `.08`, inset `0 0 0 1px .../.4`; mark pop 400ms `.7→1.18`; draw delay 100ms.
- **fill** (`references/checkbox/css/shadow/vs-checkbox-fill.css`): fill circle scales `0→1.6` over 300ms spring; check draw 300ms with 120ms delay.
- **flip** (`references/checkbox/css/shadow/vs-checkbox-flip.css`): 3D face `rotateY(180deg)` over `460ms cubic-bezier(.34,1.4,.5,1)`.
- **neon** (`references/checkbox/css/shadow/vs-checkbox-neon.css`): exact checked stack `0 0 0 1px ring/.6, 0 0 8px ring/.55, 0 0 18px ring/.4, inset 0 0 10px ring/.25`; bloom 300ms; check uses `drop-shadow(0 0 4px ring/.9)` and 320ms draw.

### Radio and radio group

- **radio base** (`references/radio/css/shadow/vs-radio.css`): mirrors checkbox's 420ms pop, dual 620/460ms ripples + 90ms delay, 620ms sampled overshoot, and 1820ms dark drop. Current radio only `scale(0→1)`.
- **radio bounce** (`references/radio/css/shadow/vs-radio-bounce.css`): seven-stage squash/hop over 760ms: `translateY(-90%) scale(.7,1.25)`, ground `1.3,.72`, rebound `-42%/.86,1.16`, settle stages to 1.
- **radio card** (`references/radio/css/shadow/vs-radio-card.css`): checked card background ring/.1, shadow `0 6px 16px ring/.18` plus inset ring, lift `-2px`; dot 320ms scale.
- **radio fill** (`references/radio/css/shadow/vs-radio-fill.css`): dot `scale(0→1)` using configurable duration and `.34,1.56,.5,1`.
- **radio glow** (`references/radio/css/shadow/vs-radio-glow.css`): checked box stack `0 0 8px ring/.5, 0 0 16px ring/.3`; halo radial ring/.55→transparent 70%, breath 1800ms; dot shadow `0 0 6px ring/.9`.
- **radio ring** (`references/radio/css/shadow/vs-radio-ring.css`): SVG ring stroke draws over 480ms `.65,0,.35,1`; center arrives after 120ms over 380ms spring.
- **group base** (`references/radio-group/css/shadow/vs-radio-group.css`): includes base radio plus masked 28px pointer ring and neighbor-light layers; current group has neither.
- **group cards** (`references/radio-group/css/shadow/vs-radio-group-cards.css`): hover lift `-3px` and `0 12px 26px -16px` accent shadow; checked lift `-1px`, inset accent + `0 12px 30px -18px`; dot strong 320ms spring.
- **group glow** (`references/radio-group/css/shadow/vs-radio-group-glow.css`): selected stack `0 0 0 1px ...60%, 0 0 10px 1px ...55%, 0 0 20px 3px ...35%`; dot glow and 620ms ripple scale `.7→2.4`.
- **group pill** (`references/radio-group/css/shadow/vs-radio-group-pill.css`): shared pill indicator moves/resizes over `420ms cubic-bezier(.34,1.56,.64,1)`, opacity 200ms.
- **group segment** (`references/radio-group/css/shadow/vs-radio-group-segment.css`): shared soft indicator uses accent mix 22%, shadow `0 4px 14px -6px ...70%`, geometry 340ms `.34,1.4,.5,1`.
- **group slide** (`references/radio-group/css/shadow/vs-radio-group-slide.css`): shared solid indicator with `0 0 10px -1px ...65%`, geometry 360ms `.34,1.35,.5,1`; selected content shifts `4px` horizontally or `-1px` vertically.

### Switch

- **base** (`references/switch/css/shadow/vs-switch.css`): pointer ripple `.45/.22/.08/0` stops at 0/30/52/72%, 640ms dual scale/fade; thumb width morph plus travel uses duration spring; internal check rotates `-45deg` and scales `.4→1`; `.7s` loader. Port only translates a fixed thumb.
- **day-night** (`references/switch/css/shadow/vs-switch-day-night.css`): off track `linear-gradient(160deg,#1a1a1a 0%,#0b0b0b 100%)`; star/moon opacity and `translateX(-4px)` crossfade; thumb uses source inset/highlight shadows and checked travel.
- **dot** (`references/switch/css/shadow/vs-switch-dot.css` and `references/switch/web-component/vs-switch-dot.js`): DOM/geometry-defined dot switch; no meaningful extracted effect declarations, so implementation must follow the web-component structure rather than invent a generic mapping.
- **glow** (`references/switch/css/shadow/vs-switch-glow.css`): checked track gradient is accent mixed 48% and 26% with black; exact hover stack reaches inset `0 0 0 1px ...75%`, inset `0 0 14px ...38%`, outer `0 0 12px ...65%`, `0 0 26px ...45%`; 2.2s breathing; thumb radial white→accent 72% with 5px/13px glow and press squash `scaleX(1.12) scaleY(.92)`.
- **label** (`references/switch/css/shadow/vs-switch-label.css`): on/off labels crossfade over 240ms; white thumb shadow `0 1px 2px .3,0 3px 8px .25`.
- **liquid** (`references/switch/css/shadow/vs-switch-liquid.css`): SVG `url(#vswq-goo)` filter; two blobs travel on staggered `duration*1.32` and `*1.62`; active stretch `.1`/`.93`. Cannot be represented by one thumb.
- **material** (`references/switch/css/shadow/vs-switch-material.css`): track inset 2px; off thumb `translateY(-50%) scale(.5)`, checked travel + scale 1; press `.72` off / `1.1` on; ripple opacity/scale 200ms + spring.

### Slider

- **base** (`references/slider/css/shadow/vs-slider.css`): icons active `.85`; focus changes track; thumb and fill are coordinated; port only provides the basic Bits track/thumb.
- **fluent** (`references/slider/css/shadow/vs-slider-fluent.css`): glass track `blur(14px) saturate(1.4)` with two inset highlights; focus adds 2px ring; mask fades around labels; thumb glass uses `blur(10px) saturate(1.3)`; value shift 260ms spring.
- **glow** (`references/slider/css/shadow/vs-slider-glow.css`): fill shadows `0 0 calc(6px*i) color 90%` and `0 0 calc(16px*i) color 60%`; brightness pulse 2.2s; thumb uses 8px/20px shadows.
- **gradient** (`references/slider/css/shadow/vs-slider-gradient.css`): three-stop `from,to,from`, `200% 100%`, pans 3s linear; focus/active thumb ring `0 0 0 6px` target color at 30%.
- **ripple** (`references/slider/css/shadow/vs-slider-ripple.css`): interaction wave 550ms ease-out, scale `.6→3.2`, opacity `.6→0`.
- **stepped** (`references/slider/css/shadow/vs-slider-stepped.css`): discrete rail moves over 260ms `.22,1.4,.36,1`; snap flash 220ms with midpoint `0 0 0 7px` accent/35%.
- **stops** (`references/slider/css/shadow/vs-slider-stops.css`): labels are interactive; stop ripple 520ms scale `1→6`, opacity `.45→0`.
- **ticks** (`references/slider/css/shadow/vs-slider-ticks.css`): active tick changes background and `scaleY(1.15)` over 180ms.

### Calendar, number, OTP, and rating

- **calendar base** (`references/calendar/css/shadow/vs-calendar.css`): panel shadow, neighboring light, pointer border radii 90px/240px with white `.4/.2→0 at 72%` and `.3/.1→0 at 82%`; nav active `.88`; shared selection highlight moves over 280ms spring. The port has no variant or moving highlight.
- **calendar compact** (`references/calendar/css/shadow/vs-calendar-compact.css`): panel enter/exit opacity + `translateY(-6px) scale(.97)` at 300ms spring/180ms exit; shared selected pill moves in 320ms; day active `.88`.
- **calendar dots** (`references/calendar/css/shadow/vs-calendar-dots.css`): panel pop 320ms from `-8px/.97`; selected dot scales in 260ms strong spring; event dots pop 280ms.
- **calendar glow** (`references/calendar/css/shadow/vs-calendar-glow.css`): panel pop 240ms; selected day base `0 0 6px ...55%`, outer `0 0 16px 4px ...70%`, 2000ms pulse.
- **calendar minimal** (`references/calendar/css/shadow/vs-calendar-minimal.css`): moving underline geometry 340ms `.34,1.4,.64,1`; panel 260ms; selection is text/underline rather than filled day.
- **calendar range-fill** (`references/calendar/css/shadow/vs-calendar-range-fill.css`): spanning accent fill has sheen 2600ms linear and grow 380ms from scaleX `.4`/opacity 0; preview opacity `.6`; pop enter 220/320ms and leave 160/200ms.
- **number base** (`references/number/css/shadow/vs-number.css`): wheel mask, neighbor/pointer glow, buttons spring; digit change uses incoming/outgoing ±100% translate and blur 7px over 360–460ms; ripple 780ms. Current input-number has none.
- **number glow** (`references/number/css/shadow/vs-number-glow.css`): source-specific outer glow and digit transition; use exact file plus `references/number/web-component/vs-number-glow.js` (pointer tracking).
- **number roll-digits** (`references/number/css/shadow/vs-number-roll-digits.css`): per-column roll mechanics; must preserve digit-place transitions from `references/number/web-component/vs-number-roll-digits.js`.
- **number segment** (`references/number/css/shadow/vs-number-segment.css`): old/new digits rotateX ±70° and translate ±60%, with 200–260ms opacity/transform choreography.
- **number slider** (`references/number/css/shadow/vs-number-slider.css`): fill is 90deg accent 30→62% mix, width 240ms ease-out; pointer drag behavior in `references/number/web-component/vs-number-slider.js`.
- **number stepper** (`references/number/css/shadow/vs-number-stepper.css`): increment/decrement produces ±14% translation + 1.08 scale over 340ms spring.
- **OTP base** (`references/otp/css/shadow/vs-otp.css`): cell border/background/transform 220/320ms and separate caret/state behavior. Current component has only this rough category.
- **OTP dots** (`references/otp/css/shadow/vs-otp-dots.css`): filled dot runs 300ms `.4→1.35→1.25` with glow `0 0 10px ...55%`.
- **OTP filled** (`references/otp/css/shadow/vs-otp-filled.css`): active ring 3px at accent 25%; filled cell changes to accent and scales 1.06 over 220ms.
- **OTP flip** (`references/otp/css/shadow/vs-otp-flip.css`): value change `rotateX(360deg)` over 360ms, border 200ms.
- **OTP glow** (`references/otp/css/shadow/vs-otp-glow.css`): filled stack `0 0 0 1px ...80%,0 0 14px 2px ...45%`; active reaches `0 0 26px 5px ...70%`; pulse 1.6s.
- **OTP underline** (`references/otp/css/shadow/vs-otp-underline.css`): underline scaleX `.9→1`, height/background/shadow 220–260ms; selected shadow `0 0 12px ...60%`.
- **rating base** (`references/rating/css/shadow/vs-rating.css`): fractional fill uses clip-path 200ms; pointer ripple 640ms; selected pop is four stages `.82→1.22→.94→1` over 420ms. Port uses only a midpoint 1.25.
- **rating bars** (`references/rating/css/shadow/vs-rating-bars.css`): fill gradient to top, height 240ms; rise 480ms `translateY(4px) scaleY(.85)→-3px/1.1→0/1`.
- **rating emoji** (`references/rating/css/shadow/vs-rating-emoji.css`): inactive grayscale/opacity `.45`, selected bounce 560ms `.7 rotate(-8)→1.3 rotate(6)→.92 rotate(-2)→1.04`.
- **rating glow** (`references/rating/css/shadow/vs-rating-glow.css`): two drop shadows at `glow` and `2*glow` (hover `1.6*` and `3*`); 2.4s pulse and 520ms flash to scale 1.32.
- **rating hearts** (`references/rating/css/shadow/vs-rating-hearts.css`): aura radial heart/40%→transparent 68%, 620ms scale `.4→1.5`; beat 720ms with `1→1.28→.94→1.16→1`.
- **rating numbers** (`references/rating/css/shadow/vs-rating-numbers.css`): selected chip flips `rotateY(0→180→360)` and scales to 1.12 over 520ms.

## Variant/state ledger — upload, color, and surfaces

### Upload file

- **base** (`references/upload-file/css/shadow/vs-upload-file.css`): pointer/neighbor masked rings; root height changes over `620ms cubic-bezier(.34,1.56,.64,1)`; empty content exit is 380ms opacity/blur `5px`/scale `.97`; hover scales `1.012`; icon lifts `-4px`/1.08; file list expands with grid rows and margin over 580ms; file removal collapses over 300–400ms with blur `8px`, `translateY(-16px) scale(.9)`. Current zone's fixed `0 0 0 4px` ring and instantly rendered grid miss the source choreography.
- **button** (`references/upload-file/css/shadow/vs-upload-file-button.css`): hover brightness 1.06 and shadow `0 6px 20px accent/40%`; sheen `linear-gradient(115deg,transparent 30%,white/.35 50%,transparent 70%)` sweeps `-120%→120%` over 720ms; drag state scales 1.03 and uses ring 4px + 8px/26px shadow; icon lifts `-2px` and scales 1.12.
- **compact** (`references/upload-file/css/shadow/vs-upload-file-compact.css`): progress line `scaleX(0→1)` from left over 320ms ease-out; drop state changes background/border without large zone motion.
- **dropzone** (`references/upload-file/css/shadow/vs-upload-file-dropzone.css`): blurred `18px` closest-side radial field orbits through ±18% translations over 7s; drag state scales `1.02`, lifts `-2px`, ring `0 0 0 4px ...22%`; icon lifts `-5px`/1.12.
- **gallery** (`references/upload-file/css/shadow/vs-upload-file-gallery.css`): thumbnail overlay uses black-to-transparent gradient; controls enter opacity 0→1 and `translateY(4px→0)` over 200ms; action scales `.8→1`; add tile rotates 90° over 320ms.
- **glow** (`references/upload-file/css/shadow/vs-upload-file-glow.css`): conic ring has accent at 60°/220° with transparent at 0°/140°/300°, opacity `.5`, continuous `--glw-speed`; drag accelerates to speed/3 and uses `0 0 34px ...32%, inset 0 0 22px ...14%`; icon lift -4px/1.1 and 22px glow.

### Chip

- **base** (`references/chip/css/shadow/vs-chip.css`): variant substate solid/flat/border is separate from the six component variants; includes pointer/neighbor masked rings and standard 780ms ripple. Close hover/active has dedicated 160ms opacity/background/scale. The port's `default/flat/border` should not replace source `bounce/fill/glow/gradient/outline`.
- **bounce** (`references/chip/css/shadow/vs-chip-bounce.css`): host press `.94`; selected bounce 520ms through `.9,1.05 → 1.12,.9 → .96,1.04 → 1.03,.98 → 1`; icon pop 420ms `0→1.35→1`.
- **fill** (`references/chip/css/shadow/vs-chip-fill.css`): colored pseudo fill grows `scaleX(0→1)` from left over 340ms ease-out.
- **glow** (`references/chip/css/shadow/vs-chip-glow.css`): hover `0 0 14px -1px ring/.55`, checked `0 0 20px 2px ring/.75`; pulsing pseudo layer 1.9s; icon `0 0 6px`.
- **gradient** (`references/chip/css/shadow/vs-chip-gradient.css`): exact 100deg stops are ring/.10 0%, ring/.42 35%, accent 55%, ring/.42 75%, ring/.10 100%; size `260% 100%`, pan 5s (3s selected), opacity `.35→.6→1`. Current 135deg two-stop gradient is wrong.
- **outline** (`references/chip/css/shadow/vs-chip-outline.css`): masked conic ring alternates ring/.25 and accent, opacity `.55→.9`, spin 2.4s (1.6s selected).

### Color picker

- **base** (`references/color-picker/css/shadow/vs-color-picker.css`): saturation/value plane is two explicit overlays (white→transparent horizontally, black→transparent vertically); hue stops are red 0, yellow 17, green 33, cyan 50, blue 67, magenta 83, red 100%. Area thumb tracks with left/top `420ms` spring for programmatic changes and scale `320ms`; active rail thumb scales 1.35 and blurs 1.1px. Source supports pointer proximity and checker/alpha layers. Current plane order roughly resembles it but omits motion/state distinctions and all layouts.
- **compact** (`references/color-picker/css/shadow/vs-color-picker-compact.css`): trigger uses pointer/neighbor ring; popover enters opacity 0/`translateY(-6px) scale(.96)` to 1/none over 180ms; swatches lift 1.12 and receive double `2px surface + 4px accent` rings; check scales `.5→1` over 200ms.
- **palette** (`references/color-picker/css/shadow/vs-color-picker-palette.css`): swatch hover lifts `-3px`; selected gets the same double ring; it is a palette-only layout, not the base picker with a `swatches` prop.
- **ring** (`references/color-picker/css/shadow/vs-color-picker-ring.css`): hue is conic red/yellow/green/cyan/blue/magenta/red, masked `transparent 58%, #000 59%`; marker translates around the ring and springs over 300ms; active scales 1.35.
- **slider** (`references/color-picker/css/shadow/vs-color-picker-slider.css`): panel uses proximity/neighbor border light; rail markers spring 300ms and scale 1.35; no saturation plane.
- **swatches** (`references/color-picker/css/shadow/vs-color-picker-swatches.css`): panel proximity/neighbor ring; swatches `translateY(-3px) scale(1.08)`, selected double ring, check `.5→1` over 200ms.

### Card

- **base** (`references/card/css/shadow/vs-card.css`): default shadow `0 1px 2px rgba(0,0,0,.08), 0 6px 18px -14px rgba(0,0,0,.16)` and hover `0 1px 3px .1, 0 12px 30px -18px .22`; hover lift -2px, active `.97`. Port uses much larger generic shadows.
- **asset** (`references/card/css/shadow/vs-card-asset.css`): media hover scale 1.03 over 620ms; action affordance starts opacity 0/scale .7/blur 6px and springs to visible; overlay glass is `blur(12px) saturate(140%)`; active action `.94`.
- **glow** (`references/card/css/shadow/vs-card-glow.css`): blurred 14px radial `120% 120% at 50% 0%`, accent mixed 55% to transparent 70%; 4.5s breath scale `.98→1.02`, hover lifts -2px. This is not the port's `shadow` variant.
- **gradient-border** (`references/card/css/shadow/vs-card-gradient-border.css`): masked conic accent/mixed-white/accent-transparent stops at 0/25/50/75/100%, opacity `.55→.95`, angle spins 6s linear; hover -2px.
- **lift** (`references/card/css/shadow/vs-card-lift.css`): exact rest shadow `0 1px 2px .12, 0 6px 18px -14px .3`; hover `translateY(-8px) scale(1.015)` and shadow `0 2px 6px .18,0 26px 50px -22px .5`; active `-3px/1.005`; media scales 1.06.
- **slider** (`references/card/css/shadow/vs-card-slider.css`): media scale 1.06 over 620ms; slide transition 760ms; overlay gradient black .5→.14 at 45%→transparent; controls enter from .72 scale + blur 4px over 240ms spring; progress width 420ms.
- **spotlight** (`references/card/css/shadow/vs-card-spotlight.css`, `references/card/web-component/vs-card-spotlight.js`): radial follows pointer CSS coordinates and fades 240ms; card lifts -2px. Port fixes radial at 50%/50% and scales it, so the defining interaction is absent.
- **tilt-3d** (`references/card/css/shadow/vs-card-tilt-3d.css`, `references/card/web-component/vs-card-tilt-3d.js`): live `perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))` updates at 90ms linear; settling and overlay opacity are separate. Port hard-codes `rotateX(3deg) rotateY(-4deg)`.

## Variant/state ledger — identity and status display

### Avatar and avatar group

- **avatar base** (`references/avatar/css/shadow/vs-avatar.css`): 240ms spring, pointer-origin ripple, neighbor/proximity border light, status offsets, typing dots `1.1s`, optional conic story ring spins 6s, live pulse 1.8s. Current `history` conic + loading shimmer only covers fragments.
- **avatar glow** (`references/avatar/css/shadow/vs-avatar-glow.css`): breathing glow/scale `.985→1.015` over 3s.
- **avatar ring** (`references/avatar/css/shadow/vs-avatar-ring.css`): conic ring separated by surface gap shadow; spin default 5s.
- **avatar squircle** (`references/avatar/css/shadow/vs-avatar-squircle.css`): hover scale 1.12 and rotate -2° over 520ms spring; active .96; uses actual squircle capability where supported.
- **avatar status** (`references/avatar/css/shadow/vs-avatar-status.css`): double surface/border status ring; status pulse 1.8s scale `1→2.4`.
- **avatar tilt** (`references/avatar/css/shadow/vs-avatar-tilt.css`, `references/avatar/web-component/vs-avatar-tilt.js`): pointer-driven rotateX/rotateY and radial highlight at `--gx/--gy`; settles over 320ms; current avatar has no tilt.
- **group base** (`references/avatar-group/css/shadow/vs-avatar-group.css`): per-item spread/lift/Z/pop custom properties, hover lift -5px and translateZ 38px, group spread uses 460ms `.34,1.8,.5,1`. Port only negative margin + fixed float.
- **group fan** (`references/avatar-group/css/shadow/vs-avatar-group-fan.css`): individual rotations animate 460ms strong spring.
- **group flip** (`references/avatar-group/css/shadow/vs-avatar-group-flip.css`): each item rotatesY 180° over 560ms; source structures front/back faces.
- **group grid** (`references/avatar-group/css/shadow/vs-avatar-group-grid.css`): gap/margins animate 420ms ease-out; item hover scale 1.12.
- **group ring** (`references/avatar-group/css/shadow/vs-avatar-group-ring.css`): hover lift -4px/1.06; conic rings spin 3.4s.
- **group wave** (`references/avatar-group/css/shadow/vs-avatar-group-wave.css`): staggered bob to `-var(--wave-h)` and back over 1.1s.

### Badge

- **base** (`references/badge/css/shadow/vs-badge.css`): pointer/neighbor masked ring and standard 780ms ripple are absent from the port. Close states run 160ms.
- **glow** (`references/badge/css/shadow/vs-badge-glow.css`): rest `0 0 8px ring/.35`; breathing base `0 0 6px ring/.28`, pseudo halo `0 0 16px 2px ring/.55`, 2.6s pulse. Port uses a 14px static shadow plus unrelated global animation.
- **gradient** (`references/badge/css/shadow/vs-badge-gradient.css`): three variant-specific 100deg multi-stop backgrounds in the exact file; animated background shifts over 3.2s ease-in-out. Port uses one 135deg two-stop gradient.
- **pulse** (`references/badge/css/shadow/vs-badge-pulse.css`): ring opacity `.55→0`, scale `1→1.35` by 70%, holds to 100%, duration prop + ease-out.
- **shimmer** (`references/badge/css/shadow/vs-badge-shimmer.css`): 90deg transparent/white/transparent sheen, `translateX(-260%)→320% rotate(20deg)` by 22%, then hold; source cycle prop and `.3,.7,.3,1`. Port continuously pans a background.
- **stripes** (`references/badge/css/shadow/vs-badge-stripes.css`): variant-specific repeating-linear gradients and marching 0.9s linear. Port uses 6/12px bands and 1.3s without source variant states.

### Indicator

- **base** (`references/indicator/css/shadow/vs-indicator.css`): badge presence enter/exit uses blur 7px and scale 0; ping 1.8s scales 1→2.1 by 70%; content swap blur 6→0 and scale .45→1 over 260ms spring.
- **bounce** (`references/indicator/css/shadow/vs-indicator-bounce.css`): repeating 1.2s squash/jump: scale 1.1/.9, translateY -42% with .94/1.08, land 1.08/.92; visibility uses 420ms enter vs 200ms exit and blur 7px.
- **odometer** (`references/indicator/css/shadow/vs-indicator-odometer.css`): individual reel transforms use `--roll` default 620ms source spring; content swap `.35` scale + blur 6px. Port animates the whole badge once for .32s.
- **ping** (`references/indicator/css/shadow/vs-indicator-ping.css`): inset 2px tone ring; 1.8s spring ping scale `.9→2.6` by 80%; source enter/exit blur choreography.
- **ring** (`references/indicator/css/shadow/vs-indicator-ring.css`): masked conic orbit (`transparent 60%,#000 62%`) spins with default 1.4s; port's ring is static border.
- **shake** (`references/indicator/css/shadow/vs-indicator-shake.css`): 2.4s cycle rotates 0,14,-12,10,-8,5,-3,0 degrees during first 21%, then rests. Variant absent.

### Progress

- **base** (`references/progress/css/shadow/vs-progress.css`): uses composited translate rather than width; determined 350ms material easing; stripes 1s; indeterminate `-100%→250%` with `.65,.05,.36,1`; ring rotates to 270°. Port animates width and uses `-105→275%`.
- **circular** (`references/progress/css/shadow/vs-progress-circular.css`): dash offset 350ms material; indeterminate whole SVG 1s to 270°.
- **glow** (`references/progress/css/shadow/vs-progress-glow.css`): box-shadow halo plus brightness `1→1.25→1` over 1.8s; spark gradient sweeps `-120→320%` over 2.2s; indeterminate ends at 222.23%. Port has a fixed 5px drop-shadow.
- **gradient** (`references/progress/css/shadow/vs-progress-gradient.css`): `linear-gradient(90deg,g1,g2,g1)` flows at source speed while bar progress uses transform 350ms; port gradient does not flow.
- **segments** (`references/progress/css/shadow/vs-progress-segments.css`): each cell fill scaleX transition 250ms; on cells glow `0 0 6px accent/55%`; indeterminate chase 1.2s.
- **striped** (`references/progress/css/shadow/vs-progress-striped.css`): exact repeating gradient in source, speed variable, transform 350ms; indeterminate `-100→222.23%`. Port's fixed 1rem diagonal texture is approximate.

### Spinner and skeleton

- **spinner base** (`references/spinner/css/shadow/vs-spinner.css`): conic transparent→ring, radial mask based on border width, speed/duration props and easing mode; do not alias source variants.
- **bars** (`references/spinner/css/shadow/vs-spinner-bars.css`): equalizer scaleY `.35→1` with per-bar phase; port aliases to generic rectangle waves.
- **bounce** (`references/spinner/css/shadow/vs-spinner-bounce.css`): falling ball squashes `1/.1 → .94/1.1 → 1.35/.55 → .92/1.12 → 1`; synchronized shadow scales `.5→1.2→.5`. Port aliases to three points.
- **comet** (`references/spinner/css/shadow/vs-spinner-comet.css`): conic stops transparent 0%, ring/.04 35%, ring 100%, masked ring, glowing head `0 0 head*2 ring/.7`. Port aliases to plain gradient ring.
- **dots** (`references/spinner/css/shadow/vs-spinner-dots.css`): dots bounce from y0/scale .6/opacity .35 to `-.7*dot`/scale1/opacity1 with duration-relative 16% stagger. Port aliases to points with fixed .15s.
- **flip** (`references/spinner/css/shadow/vs-spinner-flip.css`): 3D square cycles X180 then Y180 using `.5,0,.5,1`; port aliases to a 2D 90° morph.
- **grid** (`references/spinner/css/shadow/vs-spinner-grid.css`): nine-cell scale `.4→1`/opacity `.3→1` with explicit phase map; port aliases to four corners.
- **orbit** (`references/spinner/css/shadow/vs-spinner-orbit.css`): three dots at 0/120/240°, opacity .72/.44 and dot*1.1 glow; port aliases to nested rings.
- **pulse** (`references/spinner/css/shadow/vs-spinner-pulse.css`): outer ripple `.25→1`/opacity .9→0 using `.2,.6,.3,1`, negative half-cycle delay; core `.7→1`. Port aliases to three squares.
- **ring** (`references/spinner/css/shadow/vs-spinner-ring.css`): 12 bars rotated in 30° steps with negative duration/12 phase; port aliases to border spinner.
- **wave** (`references/spinner/css/shadow/vs-spinner-wave.css`): six dots move ±.22*size with negative duration/6 phase. Port aliases to five vertical bars.
- **skeleton base** (`references/skeleton/css/shadow/vs-skeleton.css`): moving 110deg mask has opacity cut at 15/50/85% plus independent pulse; port has no base variant.
- **blink** (`references/skeleton/css/shadow/vs-skeleton-blink.css`): `steps(1,end)` and per-item stagger. Port uses one global 1.2s blink with no stagger.
- **gradient** (`references/skeleton/css/shadow/vs-skeleton-gradient.css`): configurable angle, base/bone/base at 0/50/100%, `200% 100%`, direction-aware flow. Port forces 90deg gray/light/gray.
- **pulse** (`references/skeleton/css/shadow/vs-skeleton-pulse.css`): bone opacity `.55→1→0` plus optional 2px halo; port maps to global `rx-pulse` without halo.
- **shine** (`references/skeleton/css/shadow/vs-skeleton-shine.css`): overlay 115deg transparent 30%/white intensity 50%/transparent 70%, transforms -120→120%; port bakes the sheen into background and pans it.
- **wave** (`references/skeleton/css/shadow/vs-skeleton-wave.css`): each bone scaleY `.85→1.05`, opacity `.55→1`, with item stagger. Port aliases it to shimmer.

## Variant/state ledger — messaging and compound buttons

### Alert

- **base** (`references/alert/css/shadow/vs-alert.css`): variant tones coexist with pointer/neighbor border light and 780ms ripple; dismissal animates height/padding plus opacity, blur 6px and scale .97 over 440ms with `cubic-bezier(.5,-.45,.55,1)`. Port uses a generic Svelte slide.
- **banner** (`references/alert/css/shadow/vs-alert-banner.css`): 90deg accent/12%→transparent 30% over card; accent indicator glows 12px; timeout bar scaleX 1→0; close uses height/blur/scale exit.
- **inline** (`references/alert/css/shadow/vs-alert-inline.css`): status dot ping 1.8s scale `1→2.6`, opacity `.55→0`; close exit 420ms with blur 5px and scale .96.
- **neon** (`references/alert/css/shadow/vs-alert-neon.css`): surface radial 125%×150% at top-left; base shadows `0 16px 40px -24px #000,0 0 34px -12px accent/75%` and hover 46px/90%; masked conic border stops at 0/145/255/312/340/350/360°, spins 4.4s and blur-breathes 3.4s; current two static shadows omit the defining effect.
- **split** (`references/alert/css/shadow/vs-alert-split.css`): dedicated solid accent pane with inset separator, not just a border; same 440ms collapse.
- **toast** (`references/alert/css/shadow/vs-alert-toast.css`): shadow `0 20px 48px -16px rgb(0 0 0/.55),0 2px 8px rgb(0 0 0/.3)`; enter opacity 0, y14, scale .97, blur6 to rest over 300/480/320ms; timeout line scaleX 1→0. Port's static left border and generic slide are not faithful.

### Ask AI button

**P0** (`references/ask-ai-button/css/shadow/vs-ask-ai-button.css`, `references/ask-ai-button/web-component/vs-ask-ai-button.js`): the source is a layered particle/field system. Base fill is `linear-gradient(168deg,c1 0%,c2 28%,c3 46%,c4 72%,c5 100%)`. Seven closest-side radial fields use seven distinct duration multipliers `.71/.52/.85/.39/.97/.58/.77 * speed`, negative delays `-.31/-1.4/-.63/-2.05/-.18/-1.72/-.94s`, and separate multi-point translate3d keyframes. Pointer parallax settles over 420ms; pointer spotlight is a 96px radial white `.38→.12 42%→0 72%`; sheen runs `-130→130%` over 1.45s; click ripple runs 760ms; two sparkle layers twinkle at 3.4s and 2.6s/.7s delay, optionally counter-spin 2.1s/3.4s. The port's single `120deg` four-color background at 4s, one 32% radial overlay, and one sparkle animation is not a close approximation.

### Button group and split button

- **button group** (`references/button-group/css/shadow/vs-button-group.css`, `references/button-group/web-component/vs-button-group.js`): source effect is mostly structure/connected radii, so this is **P2** after Button is corrected. Verify orientation, separator overlap, focus stacking, disabled propagation, and per-segment radii from the web component.
- **split button** (`references/split-button/css/shadow/vs-split-button.css`, `references/split-button/web-component/vs-split-button.js`): **P0**. A shared liquid fill moves/resizes across segments using duration/ease/delay variables; segment fill runs `sb-liquid` with squash `scale(1.12,.86)→(.97,1.05)→1`; hover brightness 1.14, inset ring 1px; label transitions combine transform with opacity, scale and blur 6px using different enter/exit timings. The current two ordinary adjacent buttons and static dropdown trigger omit the signature.

## Pointer-tracking implementation inventory

The following families require DOM attachments/actions that compute pointer-local geometry; CSS-only hover is insufficient:

- Button: `references/button/web-component/vs-button.js`, `vs-button-chrome.js`, `vs-button-invert.js`, `vs-button-magnetic.js`, `vs-button-plasma.js`, `vs-button-gradient.js`, `vs-button-gooey.js`, `vs-button-glitch.js`, `vs-button-v2.js`.
- Inputs: `references/input/web-component/vs-input.js`, `vs-input-spotlight.js`; `references/textarea/web-component/vs-textarea.js`, `vs-textarea-spotlight.js`.
- Choice/value: `references/checkbox/web-component/vs-checkbox.js`, `references/radio/web-component/vs-radio.js`, `references/radio-group/web-component/vs-radio-group.js`, `references/switch/web-component/vs-switch.js`, all `references/slider/web-component/*.js` variants, `references/calendar/web-component/vs-calendar.js`, `vs-calendar-range-fill.js`.
- Number/OTP/rating: all `references/number/web-component/*.js`, base/underline OTP, and rating base/bars/emoji/glow/hearts/numbers.
- Surfaces: `references/upload-file/web-component/vs-upload-file.js`, base/bounce chip, base/ring/slider/compact/swatches color picker, card spotlight/slider/tilt-3d, avatar base/tilt, avatar-group base, badge base, indicator bounce/shake.
- Messaging/compound: alert variants, Ask AI, and Split Button web-component files.

Use Svelte 5 `{@attach}` for these behaviors. Keep pointer listeners passive where possible, batch high-frequency updates with `requestAnimationFrame` where the source does, remove CSS custom properties on teardown, and preserve keyboard/focus equivalents. Pointer effects must not become prerequisites for state visibility.

## Docs fidelity failures

The current docs generally enumerate the port's current prop unions, so they reinforce missing or renamed variants instead of exposing the source catalog:

- `src/lib/docs/pages/button.svelte` displays seven generic variants rather than 13 source variants.
- `src/lib/docs/pages/input.svelte`, `textarea.svelte`, and `select.svelte` show names but do not demonstrate pointer movement, open/close direction, stagger, active/press, or reduced-motion states.
- Checkbox, radio, radio group, switch, slider, calendar, number, OTP, rating, upload, color picker, avatar/group, spinner, and compound controls have no complete source-variant matrix because the APIs do not expose one.
- `src/lib/docs/pages/card.svelte` demonstrates fixed spotlight/tilt approximations; it needs cursor-position visual regression cases.
- Badge/progress/skeleton/alert names appear complete, but side-by-side hover/active/enter/exit/indeterminate/disabled comparisons would reveal the timing and layer mismatches.

Every repaired page should show at least rest, hover/focus, active/drag/checked/open where applicable, disabled, loading/indeterminate, dynamic content change, and reduced motion. Pointer-dependent examples need an automated sweep across corners and center, not a center-only screenshot.

## Recommended implementation order

1. **P0 shared effects:** literal Svelte attachments for pointer proximity, neighbor light, and pointer-origin ripple; shared utilities may expose mechanics, but each component must retain its source radii/strength/timing.
2. **P0 API restoration:** stop aliasing or omitting source variants. Implement Button, checkbox/radio/group, Switch, Slider, and Card first because they establish reusable motion primitives.
3. **P0 specialized renderers:** Number, OTP, Rating, Spinner, Calendar, Upload, Color Picker, Avatar Group, Ask AI, Split Button.
4. **P1 exactness pass:** Badge, Progress, Skeleton, Alert, Input/Textarea/Select exact gradients, shadow stacks, exits and stagger.
5. **P2 docs/visual tests:** source-named galleries and interaction-state snapshots in light/dark and reduced-motion modes.

## Audit constraints and uncertainties

- This report compares the raw shadow CSS and web-component behavior against `src/lib/registry/ui/**` and `src/lib/docs/pages/**`. No component was edited.
- `vs-button-push.css`, `vs-switch-dot.css`, and `vs-button-group.css` contain little or no independent extracted animation CSS; their web-component files are the implementation authority. They must not be inferred from similarly named port styles.
- Exact component-level colors remain source CSS variables; the Svelte port must route those through `--rx-*` tokens without changing stop positions, alpha, layer order, or choreography.
- A variant is not considered ported merely because its name is accepted or it is aliased to a vaguely similar renderer.
