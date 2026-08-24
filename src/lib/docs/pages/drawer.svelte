<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Drawer } from '$lib/registry/ui/drawer';
	import { Button } from '$lib/registry/ui/button';
	let open=$state(false), noOverlay=$state(false), protectedOpen=$state(false), status=$state('Closed');
	let placement=$state<'left'|'right'|'top'|'bottom'>('left');
	function show(side:typeof placement){placement=side;open=true}
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Drawer</h1><p>Token-skinned sheets for edge-aligned content, custom sizing, guarded close, and overlay-free presentation.</p></div>
<DemoSection title="Placements" source={'<Drawer bind:open placement="right" size="24rem">...</Drawer>'}><div class="row">{#each ['left','right','top','bottom'] as side}<Button onclick={()=>show(side as typeof placement)}>{side}</Button>{/each}</div><Drawer bind:open {placement} size={placement==='top'||placement==='bottom'?'16rem':'22rem'} title="Project settings" onOpenChange={(value)=>status=value?'Opened':'Closed'}><p>Drawer content remains focus trapped and keyboard dismissible.</p>{#snippet footer()}<Button onclick={()=>open=false}>Done</Button>{/snippet}</Drawer><output>{status}</output></DemoSection>
<DemoSection title="No overlay and guarded close" source={'<Drawer overlay={false}>...</Drawer>'}><div class="row"><Button variant="flat" onclick={()=>noOverlay=true}>No overlay</Button><Button variant="border" onclick={()=>protectedOpen=true}>Protected</Button></div><Drawer bind:open={noOverlay} overlay={false} placement="right" size="18rem" title="Overlay-free"><p>The page remains visually unobscured.</p></Drawer><Drawer bind:open={protectedOpen} preventClose placement="bottom" title="Unsaved changes"><p>Escape and outside interaction are blocked.</p>{#snippet footer()}<Button onclick={()=>protectedOpen=false}>Save and close</Button>{/snippet}</Drawer></DemoSection>
<DemoSection title="Trigger snippet" source={'<Drawer>{#snippet trigger()}Open inline{/snippet}...</Drawer>'}><Drawer placement="right" title="Inline trigger">{#snippet trigger()}<span class="trigger">Open from trigger snippet</span>{/snippet}<p>The optional trigger owns the sheet activation semantics.</p></Drawer></DemoSection>
<style>.row{display:flex;flex-wrap:wrap;gap:.75rem}.trigger{display:inline-flex;border-radius:var(--rx-radius);padding:.7rem 1rem;background:rgb(var(--rx-primary));color:rgb(var(--rx-light));font-weight:650}output{display:block;margin-top:.75rem;color:rgb(var(--rx-text-muted))}</style>
