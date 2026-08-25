<script lang="ts">
	import type {Snippet} from 'svelte';import {Dock} from './dock';import {Sidebar} from './sidebar';import {NavMenu} from './nav-menu';import {Scrollbar} from './scrollbar';
	let {icon}:{icon:Snippet}=$props();let active=$state('home');
	const dock=$derived([{id:'home',label:'Dock home',icon},{id:'search',label:'Dock search',icon}]);
	const sidebar=$derived([{id:'home',label:'Sidebar home',icon},{id:'mail',label:'Sidebar mail',icon,badge:2,children:[{id:'archive',label:'Archive'}]}]);
	const navigation=[{label:'Products',children:[{label:'Editor',href:'#editor',description:'Build things'},{label:'Themes',href:'#themes',description:'Skin things'}]},{label:'About',href:'#about'}];
</script>
<div data-testid="dock-shell"><Dock items={dock} variant="glass" bind:active/></div>
<div data-testid="sidebar-shell"><Sidebar items={sidebar} variant="rail" bind:active/></div>
<div data-testid="nav-shell"><NavMenu items={navigation} variant="spotlight"/></div>
<div data-testid="scroll-shell" style="height:8rem"><Scrollbar variant="dots" orientation="both" hideDelay={900}><div style="width:30rem;height:20rem">Scrollable physics</div></Scrollbar></div>
