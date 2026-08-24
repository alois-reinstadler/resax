<script lang="ts" module>import type { Snippet } from 'svelte'; export interface TabsListProps { children: Snippet }</script>
<script lang="ts">
	import { Tabs as Primitive } from 'bits-ui'; import { getTabsContext } from './context';
	let { children }: TabsListProps = $props(); const config = getTabsContext();
	function track(node: HTMLElement) { let frame=0; const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const active=node.querySelector<HTMLElement>('[role=tab][data-state=active]');if(!active)return;node.style.setProperty('--rx-i-x',`${active.offsetLeft}px`);node.style.setProperty('--rx-i-y',`${active.offsetTop}px`);node.style.setProperty('--rx-i-w',`${active.offsetWidth}px`);node.style.setProperty('--rx-i-h',`${active.offsetHeight}px`)})};const ro=new ResizeObserver(measure);ro.observe(node);const mo=new MutationObserver(measure);mo.observe(node,{attributes:true,subtree:true,attributeFilter:['data-state']});document.fonts?.ready.then(measure);measure();return()=>{ro.disconnect();mo.disconnect();cancelAnimationFrame(frame)}}
</script>
<Primitive.List class="rx-list" data-variant={config.variant} data-orientation={config.orientation} {@attach track}><span class="rx-indicator" aria-hidden="true"></span>{@render children()}</Primitive.List>
<style>
	:global {
		.rx-list{position:relative;display:inline-flex;align-self:flex-start;gap:.25rem;padding:.25rem;border-radius:var(--rx-radius);background:rgb(var(--rx-text)/.06)}.rx-list[data-orientation=vertical]{flex-direction:column}.rx-indicator{position:absolute;z-index:0;left:0;top:0;width:var(--rx-i-w,0);height:var(--rx-i-h,0);transform:translate(var(--rx-i-x,0),var(--rx-i-y,0));border-radius:calc(var(--rx-radius)*.8);background:rgb(var(--rx-color));box-shadow:0 5px 14px rgb(var(--rx-color)/.23);transition:width 220ms var(--rx-ease),height 220ms var(--rx-ease),transform 220ms var(--rx-ease)}
		.rx-list[data-variant=bubble] .rx-indicator{border-radius:999px}.rx-list[data-variant=card]{background:transparent;border-bottom:1px solid rgb(var(--rx-text)/.12);border-radius:0}.rx-list[data-variant=chrome]{border-radius:999px}.rx-list[data-variant=gooey] .rx-indicator{filter:blur(.3px);border-radius:45% 55% 50% 45%}.rx-list[data-variant=neon] .rx-indicator{box-shadow:0 0 8px rgb(var(--rx-color)/.8),0 0 24px rgb(var(--rx-color)/.45)}
		@media(prefers-reduced-motion:reduce){.rx-indicator{transition:none}}
	}
</style>
