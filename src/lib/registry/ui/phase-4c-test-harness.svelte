<script lang="ts">
	import { LinkBar } from './link-bar'; import { Dock } from './dock'; import { Sidebar } from './sidebar'; import { NavMenu } from './nav-menu'; import { Scrollbar } from './scrollbar'; import type { Snippet } from 'svelte';
	let { icon }: { icon: Snippet } = $props(); let active=$state('one');
	const links=[{id:'one',label:'One'},{id:'two',label:'Two'},{id:'off',label:'Off',disabled:true}];
	const dock=$derived([{id:'one',label:'One',icon},{id:'off',label:'Off',icon,disabled:true}]);
	const sidebar=[{id:'home',label:'Home'},{id:'disabled',label:'Disabled',disabled:true}];
	const navigation=[{label:'Products',children:[{label:'Editor',href:'/editor',description:'Build things'}]},{label:'About',href:'/about'}];
</script>
<LinkBar items={links} bind:active/><output>{active}</output><Dock items={dock}/>
<Sidebar items={sidebar} bind:active/><NavMenu items={navigation}/>
<div style="height:5rem"><Scrollbar orientation="both"><div style="width:20rem;height:10rem">Scrollable content</div></Scrollbar></div>
