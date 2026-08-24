<script lang="ts">import DemoSection from '../DemoSection.svelte';import {LinkBar} from '$lib/registry/ui/link-bar';let active=$state('home');const items=[{id:'home',label:'Home'},{id:'features',label:'Features'},{id:'pricing',label:'Pricing'},{id:'about',label:'About'}];</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Link Bar</h1><p>Compact navigation with a fluid active indicator and Vuesax-inspired effects.</p></div>
<DemoSection title="Variants" source={'<LinkBar bind:active {items} variant="pill" />'}><div class="stack"><LinkBar bind:active {items}/><LinkBar bind:active {items} variant="pill" color="success"/><LinkBar bind:active {items} variant="underline" color="warn"/></div></DemoSection>
<style>.stack{display:grid;gap:1.25rem;justify-items:start}</style>
