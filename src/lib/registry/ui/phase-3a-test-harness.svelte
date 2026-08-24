<script lang="ts">
	import { Popup, ConfirmPopup } from './popup';
	import { Drawer } from './drawer';
	let popup = $state(false), drawer = $state(false), confirm = $state(false), protectedMode = $state(false);
	let changed = $state('');
</script>

<output data-testid="state">{popup}:{drawer}:{confirm}:{changed}</output>
<Popup bind:open={popup} title="Example" transition="flip" preventClose={protectedMode} onOpenChange={(value) => changed = `popup-${value}`}><p>Popup body</p></Popup>
<Drawer bind:open={drawer} placement="right" title="Drawer"><p>Drawer body</p></Drawer>
<ConfirmPopup bind:open={confirm} message="Proceed?" onConfirm={() => changed = 'confirmed'} onCancel={() => changed = 'cancelled'} />
<button onclick={() => { protectedMode = false; popup = true; }}>Show popup</button>
<button onclick={() => { protectedMode = true; popup = true; }}>Show protected popup</button>
<button onclick={() => drawer = true}>Show drawer</button>
<button onclick={() => confirm = true}>Show confirm</button>
