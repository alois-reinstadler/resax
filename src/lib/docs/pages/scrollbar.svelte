<script lang="ts">import DemoSection from '../DemoSection.svelte';import {Scrollbar} from '$lib/registry/ui/scrollbar';const rows=Array.from({length:18},(_,i)=>`Navigation surface ${i+1}`);</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Scrollbar</h1><p>Native scrolling with visible, token-driven Vuesax scrollbar treatments.</p></div>
<DemoSection title="Vertical glow" source={'<Scrollbar variant="glow">...</Scrollbar>'}><Scrollbar variant="glow" color="primary"><div class="scroll-content">{#each rows as row}<p>{row}</p>{/each}</div></Scrollbar></DemoSection>
<style>:global(.rx-scrollbar){width:100%;height:16rem}.scroll-content{padding:1rem}.scroll-content p{margin:0;padding:.65rem;border-bottom:1px solid rgb(var(--rx-text)/.08)}</style>
