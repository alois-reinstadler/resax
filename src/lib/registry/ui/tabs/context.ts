import { getContext, setContext } from 'svelte';
export type TabsVariant = 'default'|'bubble'|'card'|'chrome'|'gooey'|'neon';
export type TabsContext = { variant: TabsVariant; orientation: 'horizontal'|'vertical' };
const key=Symbol('rx-tabs'); export const setTabsContext=(v:TabsContext)=>setContext(key,v); export const getTabsContext=()=>getContext<TabsContext>(key);
