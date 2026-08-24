<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Select, SelectGroup, SelectItem } from '$lib/registry/ui/select';
	let single = $state('design');
	let multiple = $state<string[]>(['design', 'research']);
	let chips = $state<string[]>(['svelte', 'typescript']);
	let filtered = $state('');
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Select</h1><p>Accessible single, multiple, grouped, and filterable selection with Vuesax-inspired floating labels.</p></div>
<DemoSection title="Single selection" source={'<Select bind:value label="Team">...</Select>'}>
	<div class="select-demo-grid"><Select bind:value={single} label="Team" placeholder="Choose a team"><SelectItem value="design">Design</SelectItem><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="research">Research</SelectItem></Select></div>
</DemoSection>
<DemoSection title="Multiple and chips" source={'<Select multiple chips bind:value>...</Select>'}>
	<div class="select-demo-grid"><Select multiple bind:value={multiple} label="Disciplines"><SelectItem value="design">Design</SelectItem><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="research">Research</SelectItem></Select><Select multiple chips bind:value={chips} label="Stack"><SelectItem value="svelte">Svelte</SelectItem><SelectItem value="typescript">TypeScript</SelectItem><SelectItem value="vitest">Vitest</SelectItem></Select></div>
</DemoSection>
<DemoSection title="Filter and groups" source={'<Select filter><SelectGroup label="Fruit">...</SelectGroup></Select>'}>
	<div class="select-demo-grid"><Select filter bind:value={filtered} label="Search fruit" placeholder="Type to filter"><SelectGroup label="Citrus"><SelectItem value="orange" label="Orange">Orange</SelectItem><SelectItem value="lemon" label="Lemon">Lemon</SelectItem></SelectGroup><SelectGroup label="Orchard"><SelectItem value="apple" label="Apple">Apple</SelectItem><SelectItem value="pear" label="Pear" disabled>Pear (disabled)</SelectItem></SelectGroup></Select></div>
</DemoSection>
<DemoSection title="States, sizes, colors, and loading" source={'<Select state="danger" message="Required">...</Select>'}>
	<div class="select-demo-grid"><Select size="lg" color="success" label="Large success"><SelectItem value="ready">Ready</SelectItem></Select><Select state="danger" message="Please select a status" label="Danger"><SelectItem value="blocked">Blocked</SelectItem></Select><Select size="sm" state="warn" label="Small warning"><SelectItem value="review">Review</SelectItem></Select><Select loading label="Loading options"><SelectItem value="soon">Available soon</SelectItem></Select><Select disabled label="Disabled"><SelectItem value="locked">Locked</SelectItem></Select></div>
</DemoSection>

<style>.select-demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 1rem; align-items: start; width: 100%; }</style>
