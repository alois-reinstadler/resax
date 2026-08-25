<script lang="ts">
	import{Popup}from'.';import{Drawer}from'../drawer';import{Tooltip}from'../tooltip';import{Dropdown,DropdownItem}from'../dropdown';import{ContextMenu,ContextMenuItem}from'../context-menu';
	let{mode}:{mode:'popup'|'popup-morph'|'drawer'|'tooltip'|'dropdown'|'context'}=$props();let popupOpen=$state(true),popupMorphOpen=$state(false),drawerOpen=$state(true),tooltipOpen=$state(true),dropdownOpen=$state(true);
</script>
{#if mode==='popup'}<Popup bind:open={popupOpen} transition="flip" title="Source popup"><p>Panel</p></Popup>
{:else if mode==='popup-morph'}<Popup bind:open={popupMorphOpen} transition="base" title="Morph popup">{#snippet trigger()}<span data-testid="morph-trigger-face">Open identity popup</span>{/snippet}<p>Identity panel</p></Popup>
{:else if mode==='drawer'}<Drawer bind:open={drawerOpen} variant="blur" placement="right" title="Source drawer"><p>Panel</p></Drawer>
{:else if mode==='tooltip'}<Tooltip bind:open={tooltipOpen} variant="glow" content="Source tooltip"><button>Anchor</button></Tooltip>
{:else if mode==='dropdown'}<Dropdown bind:open={dropdownOpen} variant="spring">{#snippet children()}Menu{/snippet}{#snippet content()}<DropdownItem>First</DropdownItem><DropdownItem>Second</DropdownItem>{/snippet}</Dropdown>
{:else}<ContextMenu variant="radial">{#snippet children()}<div data-testid="context-target">Target</div>{/snippet}{#snippet content()}<ContextMenuItem>First</ContextMenuItem><ContextMenuItem>Second</ContextMenuItem>{/snippet}</ContextMenu>{/if}
