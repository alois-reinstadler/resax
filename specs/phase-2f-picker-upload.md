# Spec: Phase 2f — ColorPicker, UploadFile

Status: blocked until Phase 2a–2c merge. Standard ground rules (AGENTS.md, own worktree, `pages/` demos, fidelity notes). These are the two heaviest custom-logic form components; ship the v1 subset below — noted exclusions are intentional (PLAN.md risk register).

## color-picker — `src/lib/registry/ui/color-picker/`

Custom implementation (no suitable bits-ui primitive). Anatomy: saturation/value area + hue rail + optional alpha rail + swatches + hex/rgb text input.

```ts
interface ColorPickerProps {
  value?: string;                  // $bindable; canonical output '#rrggbb' or '#rrggbbaa' when alpha
  alpha?: boolean;
  swatches?: string[];             // preset palette row
  color?: RxColor;                 // UI accent (rails/knobs), not the picked value
  size?: 'lg' | 'default' | 'sm';
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}
```

- Internal HSV state (`$state`), derived hex both directions; conversion helpers in a colocated pure `hsv.ts` module with unit tests (exhaustive round-trips at edges: black, white, greys where hue is unstable — preserve last hue like every serious picker).
- Pointer interaction via pointer capture on area + rails (drag continues outside bounds); knobs are focusable with arrow-key nudging (shift = big step) and `role="slider"` + aria-valuetext per rail, 2D area uses two aria value axes convention (`aria-valuetext` describing both).
- Text input accepts any `getColor()`-parsable value; invalid input keeps last valid, marks danger state.
- v1 exclusions (document in demo page): eyedropper API, palette editing, gradient picking.

## upload — `src/lib/registry/ui/upload/`

Vuesax VsUploadFile: drop zone + previews grid + per-file progress/state.

```ts
interface UploadFile { id: string; file: File; status: 'queued' | 'uploading' | 'done' | 'error'; progress: number; previewUrl?: string; }
interface UploadProps {
  files?: UploadFile[];            // $bindable — consumer owns actual uploading
  accept?: string; multiple?: boolean; maxSize?: number; maxFiles?: number;
  color?: RxColor; disabled?: boolean;
  label?: string | Snippet;        // drop-zone content
  onFilesAdded?: (added: UploadFile[]) => void;
  onFileRemoved?: (file: UploadFile) => void;
  onRejected?: (rejections: Array<{ file: File; reason: 'size' | 'type' | 'count' }>) => void;
}
```

- Hidden `<input type="file">` + click/keyboard on zone + drag-over state (token accent ring); image files get object-URL previews (revoke on remove/destroy via `$effect` cleanup); non-images show extension tile.
- Component does NOT upload — it manages selection/preview/state UI; demo simulates progress with a timer to show uploading/done/error states.
- Rejections (size/type/count) surface via `onRejected` and a transient inline message.

## Demos, registry, tests

- Pages: `color-picker.svelte` (nav slug for VsColorPicker), `upload-file.svelte` — check the actual slugify output for `UploadFile` (`upload-file`) and name the page to match nav.
- Registry: 2 items; `local:` deps; checker += 2. ColorPicker item includes `hsv.ts` as a second file.
- Tests: hsv round-trips incl. grey hue preservation; text input invalid → keeps value + danger; keyboard nudge changes value; upload: add via change event updates bindable + fires callback, maxSize/type/count rejections fire `onRejected` with reasons, remove revokes preview (assert callback + list update; object-URL revocation via spy).

## Acceptance criteria

Standard set + explicit list of v1 exclusions in the report.
