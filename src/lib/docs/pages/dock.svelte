<script lang="ts">import DemoSection from '../DemoSection.svelte';import {Dock} from '$lib/registry/ui/dock';import House from '@lucide/svelte/icons/house';import Search from '@lucide/svelte/icons/search';import Settings from '@lucide/svelte/icons/settings';const items=[{id:'home',label:'Home',icon:home},{id:'search',label:'Search',icon:search},{id:'settings',label:'Settings',icon:settings}];</script>
{#snippet home()}<House size={20}/>{/snippet}{#snippet search()}<Search size={20}/>{/snippet}{#snippet settings()}<Settings size={20}/>{/snippet}
<div class="page-heading"><p class="eyebrow">Component</p><h1>Dock</h1><p>A keyboard-friendly application dock with pointer proximity magnification.</p></div>
<DemoSection title="Glass dock" source={'<Dock {items} variant="glass" />'}><div class="dock-demo"><Dock {items} variant="glass" magnification={1.7}/></div></DemoSection>
<DemoSection title="Neon" source={'<Dock {items} variant="neon" color="primary" />'}><div class="dock-demo"><Dock {items} variant="neon"/></div></DemoSection>
<style>.dock-demo{display:grid;min-height:9rem;place-items:center}</style>
