<script lang="ts">import DemoSection from '../DemoSection.svelte';import { ColorPicker } from '$lib/registry/ui/color-picker';let color=$state('#3366ff');</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Color Picker</h1><p>Choose colors through saturation, hue, alpha, presets, or text.</p></div>
<DemoSection title="Interactive" source={'<ColorPicker bind:value alpha />'}><div class="demo"><ColorPicker bind:value={color} alpha swatches={['#3366ff','#22c55e','#ef4444','#f59e0b','#8b5cf6']}/><span class="sample" style={`background:${color}`}>{color}</span></div></DemoSection>
<DemoSection title="Sizes and states"><div class="row"><ColorPicker size="sm" value="#22c55e" color="success"/><ColorPicker size="lg" value="#ef4444" color="danger" disabled/></div></DemoSection>
<DemoSection title="Version 1 scope"><p>Version 1 intentionally excludes the EyeDropper API, palette editing, and gradient picking.</p></DemoSection>
<style>.demo,.row{display:flex;align-items:flex-start;gap:1.5rem;flex-wrap:wrap}.sample{padding:.75rem 1rem;border-radius:var(--rx-radius);color:rgb(var(--rx-light));font-weight:700}</style>
