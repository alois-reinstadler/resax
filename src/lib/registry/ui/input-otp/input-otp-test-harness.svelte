<script lang="ts">import InputOtp from './input-otp.svelte'; let { masked = false }: { masked?: boolean } = $props(); let value = $state(''); let completed = $state('');</script>
<button onclick={() => value = '123456'}>Set code</button><output>{value}</output><span data-completed>{completed}</span><InputOtp bind:value {masked} onComplete={(next) => completed = next} />
