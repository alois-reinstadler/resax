# Spec: Phase 2e — Calendar / DatePicker

Status: blocked until Phase 2a–2c merge (heavy single-family stream).
Standard ground rules. bits-ui Calendar, RangeCalendar, and DatePicker build on `@internationalized/date` — fetch live bits-ui docs first; both npm packages go in the item's `dependencies`.

## calendar — `src/lib/registry/ui/calendar/`

Exports: `Calendar` (inline month grid) and `DatePicker` (input + popover calendar). One registry item.

```ts
interface CalendarProps {
  value?: DateValue | DateValue[] | { start: DateValue; end: DateValue };  // $bindable; mode-dependent
  mode?: 'single' | 'multiple' | 'range';
  color?: RxColor;
  minValue?: DateValue; maxValue?: DateValue;
  disabled?: boolean;
  isDateUnavailable?: (date: DateValue) => boolean;
  numberOfMonths?: number;        // side-by-side months (range UX)
  onValueChange?: (value: CalendarProps['value']) => void;
}
interface DatePickerProps extends /* calendar surface */ {
  label?: string;                  // floating label, input anatomy
  placeholder?: string;
  state?: 'default' | 'success' | 'danger' | 'warn';
  message?: string | Snippet;
  size?: 'lg' | 'default' | 'sm';
}
```

- Vuesax look: rounded cell grid; selected day = solid `--rx-color` circle/square; range = tinted band between endpoints with solid caps; today = outlined; hover = soft tint; month/year header with animated prev/next (easing tokens); weekday row muted.
- All date math/locale/keyboard/aria from bits-ui + @internationalized/date. No hand-rolled date logic.
- Popover (DatePicker) opens with scale+fade easing preset; closes on select (single) / on range completion.

## Demo page, registry, tests

- `src/lib/docs/pages/calendar.svelte`: inline single/multiple/range, two-month range, min/max + unavailable dates, DatePicker with label/states, colors.
- Registry: 1 item; deps `bits-ui`, `@internationalized/date`; `local:` deps; checker += 1.
- Tests: value bindable per mode (construct CalendarDate values); range selection produces start/end; unavailable date not selectable; min/max clamps navigation; DatePicker renders input with aria-expanded wiring.

## Acceptance criteria

Standard set + bits-ui/@internationalized-date version notes. Report any Vuesax calendar behaviors (fetched from live demo if available) that were intentionally not covered.
