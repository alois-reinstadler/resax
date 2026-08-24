<script lang="ts" module>import type { Snippet } from 'svelte'; export interface AccordionItemProps { value: string; title: string | Snippet; disabled?: boolean; icon?: Snippet; children: Snippet; }</script>
<script lang="ts">
	import { Accordion as Primitive } from 'bits-ui';
	import { getAccordionContext } from './context';
	let { value, title, disabled = false, icon, children }: AccordionItemProps = $props();
	const config = getAccordionContext();
</script>
<Primitive.Item {value} {disabled} class="rx-item" data-variant={config.variant} data-effect={config.effect}>
	<Primitive.Header class="rx-header">
		<Primitive.Trigger class="rx-trigger">{#if icon}<span class="rx-icon">{@render icon()}</span>{/if}<span class="rx-title">{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}</span><span class="rx-chevron" aria-hidden="true">⌄</span></Primitive.Trigger>
	</Primitive.Header>
	<Primitive.Content class="rx-content"><div class="rx-inner">{@render children()}</div></Primitive.Content>
</Primitive.Item>
<style>
	:global {
	.rx-item{overflow:hidden;border:1px solid rgb(var(--rx-color)/.16);border-radius:var(--rx-radius);background:rgb(var(--rx-surface));transition:box-shadow var(--rx-duration) var(--rx-ease),transform var(--rx-duration) var(--rx-ease)}
	.rx-item[data-variant=filled]{background:rgb(var(--rx-color)/.1)}.rx-item[data-variant=ghost]{border-color:transparent;background:transparent}
	.rx-header{margin:0}.rx-trigger{display:flex;width:100%;align-items:center;gap:.65rem;border:0;padding:1rem;text-align:left;color:rgb(var(--rx-text));background:transparent;font:inherit;font-weight:650;cursor:pointer}.rx-trigger:focus-visible{outline:3px solid rgb(var(--rx-color)/.25);outline-offset:-3px}.rx-trigger:disabled{opacity:.5;cursor:not-allowed}.rx-title{flex:1}.rx-icon{display:inline-flex;color:rgb(var(--rx-color))}.rx-chevron{font-size:1.25em;transition:transform var(--rx-duration) var(--rx-ease)}.rx-trigger[data-state=open] .rx-chevron{transform:rotate(180deg)}
	.rx-content{overflow:hidden}.rx-content[data-state=open]{animation:rx-open var(--rx-duration) var(--rx-ease)}.rx-content[data-state=closed]{animation:rx-close var(--rx-duration) var(--rx-ease)}.rx-inner{padding:0 1rem 1rem;color:rgb(var(--rx-text)/.75)}
	.rx-item[data-effect=slide][data-state=open]{border-left:3px solid rgb(var(--rx-color))}.rx-item[data-effect=slide] .rx-content[data-state=open] .rx-inner{animation:rx-slide var(--rx-duration) var(--rx-ease)}.rx-item[data-effect=glow][data-state=open]{box-shadow:0 0 0 3px hsl(from rgb(var(--rx-color)) h s l/.18),0 10px 28px rgb(var(--rx-color)/.16)}.rx-item[data-effect=bounce][data-state=open]{animation:rx-bounce 420ms var(--rx-ease)}
	@keyframes rx-open{from{height:0;opacity:0}to{height:var(--bits-accordion-content-height);opacity:1}}@keyframes rx-close{from{height:var(--bits-accordion-content-height);opacity:1}to{height:0;opacity:0}}@keyframes rx-slide{from{opacity:0;transform:translateX(-.5rem)}}@keyframes rx-bounce{40%{transform:scale(1.015)}70%{transform:scale(.995)}}
	@media(prefers-reduced-motion:reduce){.rx-item,.rx-chevron,.rx-content,.rx-inner{transition:none!important;animation:none!important}}
	}
</style>
