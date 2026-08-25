<script lang="ts" module>
 import type { Snippet } from 'svelte'; import type { RxColor } from '$lib/registry/lib/color';
 export interface StepsProps { current?: number; orientation?: 'horizontal'|'vertical'; color?: RxColor; variant?: 'default'|'arrow'|'bar'|'circular'|'pills'|'timeline'; linear?: boolean; clickable?: boolean; onCurrentChange?: (index:number)=>void; children: Snippet; }
</script>
<script lang="ts">
 import { styleColor } from '$lib/registry/lib/color'; import { setStepsContext, type StepRecord } from './context';
 let { current=$bindable(0), orientation='horizontal', color, variant='default', linear=false, clickable=false, onCurrentChange, children }: StepsProps = $props();
 let records: StepRecord[]=[];
 function register(step: StepRecord){ const index=records.length; records.push(step); return index; }
 function choose(index:number){ if(!clickable || records[index]?.disabled) return; if(linear && index>current+1) return; current=index; onCurrentChange?.(index); }
 setStepsContext({register,state:()=>({current,orientation,variant,clickable,linear}),choose});
 function keydown(e:KeyboardEvent){ if(!clickable) return; const delta=(orientation==='horizontal'?(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0):(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0)); if(delta){e.preventDefault(); let n=current+delta; while(records[n]?.disabled)n+=delta; if(n>=0&&n<records.length)choose(n);} }
</script>
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<ol class="rx-steps rx-steps--{orientation} rx-steps--{variant}" data-current={current} style={styleColor(color) ?? '--rx-color: var(--rx-primary)'} onkeydown={keydown}>{@render children()}</ol>
<style>
 .rx-steps{display:flex;list-style:none;margin:0;padding:0;counter-reset:step;gap:0;color:rgb(var(--rx-text))}.rx-steps--vertical{flex-direction:column}.rx-steps--horizontal{align-items:flex-start}.rx-steps--bar{gap:3px}.rx-steps--pills{gap:8px}.rx-steps--timeline{gap:0}@media(prefers-reduced-motion:reduce){.rx-steps :global(*){animation:none!important;transition-duration:0ms!important}}
</style>
