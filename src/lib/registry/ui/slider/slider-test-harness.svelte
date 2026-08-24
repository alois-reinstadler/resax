<script lang="ts">import Slider from './slider.svelte'; let value = $state([20, 80]);</script>
<button onclick={() => value = [30, 70]}>Set range</button><output>{value.join(',')}</output><Slider bind:value />
