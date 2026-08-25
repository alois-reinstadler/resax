<script lang="ts">
	import{Transform}from'./transform';import{Separator}from'./separator';import{Spacer}from'./spacer';
	let{mode='transform'}:{mode?:'transform'|'morph'|'separator'|'spacer'}=$props();let open=$state(false);
</script>
{#if mode==='transform'}<Transform label="Open profile" variant="flip" axis="x" bind:open><div>Profile panel</div></Transform><output>{open?'open':'closed'}</output>{:else if mode==='morph'}<Transform label="Morph profile" variant="morph" placement="anchor" side="over"><div class="morph-card">Morph panel</div></Transform>{:else if mode==='separator'}<div style="height:120px"><Separator variant="flow" orientation="vertical" labelPosition="start">{#snippet children()}Continue{/snippet}</Separator></div>{:else}<div class="row"><span>A</span><Spacer size="lg" demo/><span>B</span></div>{/if}
<style>.row{display:flex}</style>
