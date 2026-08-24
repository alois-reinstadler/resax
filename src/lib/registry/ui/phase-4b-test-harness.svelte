<script lang="ts">import {Steps,Step} from './steps';import {DotStepper} from './dot-stepper';import {Timeline} from './timeline';import {FileTree,type FileTreeNode} from './file-tree';let step=$state(0);let dot=$state(0);let changed=$state(-1);const nodes:FileTreeNode[]=[{id:'root',label:'root',type:'directory',children:[{id:'a',label:'a.ts',type:'file'},{id:'off',label:'disabled',type:'file',disabled:true},{id:'dir',label:'dir',type:'directory',children:[{id:'b',label:'b.ts',type:'file'}]}]}];let expanded=$state(['root']);let selected=$state<string|undefined>();const items=[{title:'Started',description:'First'},{title:'Done',description:'Second'}];</script>
<output data-testid="state">{step}:{dot}:{changed}</output>
<Steps bind:current={step} clickable linear onCurrentChange={(i)=>changed=i}><Step title="One"/><Step title="Two"/><Step title="Three"/></Steps>
<DotStepper bind:current={dot} count={3} labels={['Alpha','Beta','Gamma']} onCurrentChange={(i)=>changed=i}/>
<Timeline {items} variant="alternating"/>
<FileTree {nodes} bind:expanded bind:selected/>
