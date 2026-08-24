<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Radio, RadioGroup } from '$lib/registry/ui/radio-group';
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Radio</h1><p>Radio is installed with RadioGroup and inherits its color and size.</p></div>
<DemoSection title="Radio choices" source={'<RadioGroup><Radio value="one">One</Radio></RadioGroup>'}><RadioGroup value="one" orientation="horizontal"><Radio value="one">One</Radio><Radio value="two">Two</Radio></RadioGroup><p><a href="/components/radio-group">See all RadioGroup examples</a></p></DemoSection>
