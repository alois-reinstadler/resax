<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';
	import DemoSection from '../DemoSection.svelte';
	import { Calendar, DatePicker, type CalendarValue } from '$lib/registry/ui/calendar';
	let base = $state<CalendarValue>(new CalendarDate(2026,8,24));
	let compact = $state<CalendarValue>(new CalendarDate(2026,8,12));
	let dots = $state<CalendarValue>([new CalendarDate(2026,8,4),new CalendarDate(2026,8,12)]);
	let range = $state<CalendarValue>({start:new CalendarDate(2026,8,8),end:new CalendarDate(2026,8,14)});
	let picker = $state<CalendarValue>();
	const unavailable = (date: DateValue) => date.day === 11 || date.day === 18;
	const events = (date: DateValue) => date.day % 7 === 0 ? 3 : date.day % 4 === 0 ? 1 : 0;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Calendar</h1><p>Six source selection systems: moving chips, compact pills, event dots, neon selection, minimal underline, and a spanning range sheen.</p></div>
<DemoSection title="Base — pointer light and moving selection" source={'<Calendar variant="base" bind:value />'}><div class="calendar-demo" data-demo-section="base"><Calendar variant="base" bind:value={base} /><Calendar variant="base" bind:value={base} size="lg" radius="pill" color="success" /></div></DemoSection>
<DemoSection title="Compact and dots" source={'<Calendar variant="compact" />\n<Calendar variant="dots" mode="multiple" {events} />'}><div class="calendar-demo" data-demo-section="compact-dots"><Calendar variant="compact" bind:value={compact} size="sm" /><Calendar variant="dots" mode="multiple" bind:value={dots} {events} color="success" /></div></DemoSection>
<DemoSection title="Glow and minimal" source={'<Calendar variant="glow" />\n<Calendar variant="minimal" />'}><div class="calendar-demo" data-demo-section="glow-minimal"><Calendar variant="glow" value={new CalendarDate(2026,8,17)} color="warn" /><Calendar variant="minimal" value={new CalendarDate(2026,8,19)} color="primary" /></div></DemoSection>
<DemoSection title="Range fill sheen" source={'<Calendar variant="range-fill" mode="range" bind:value />'}><div class="calendar-demo" data-demo-section="range"><Calendar variant="range-fill" mode="range" bind:value={range} color="primary" /><Calendar variant="range-fill" mode="range" bind:value={range} numberOfMonths={2} /></div></DemoSection>
<DemoSection title="Unavailable and disabled"><div class="calendar-demo" data-demo-section="states"><Calendar variant="dots" value={new CalendarDate(2026,8,15)} isDateUnavailable={unavailable} events={events} color="danger" /><Calendar variant="glow" disabled value={new CalendarDate(2026,8,15)} /></div></DemoSection>
<DemoSection title="DatePicker — trigger-to-panel morph" source={'<DatePicker variant="glow" label="Appointment" />'}><div class="picker-demo" data-demo-section="date-picker"><DatePicker bind:value={picker} variant="glow" label="Appointment" placeholder="Choose a date" message="The trigger expands into the panel, then folds back on close." /><DatePicker variant="minimal" label="Review date" state="warn" message="Confirmation required" /><DatePicker variant="range-fill" mode="range" label="Trip dates" message="Choose a start, then hover to preview the range." /></div></DemoSection>

<style>.calendar-demo{display:flex;align-items:flex-start;flex-wrap:wrap;gap:1.25rem}.picker-demo{display:grid;width:min(100%,30rem);gap:1rem}</style>
