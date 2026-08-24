<script lang="ts">import DemoSection from '../DemoSection.svelte'; import { InputOtp } from '$lib/registry/ui/input-otp'; let value = $state(''); let status = $state('Enter all six digits');</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>OTP</h1><p>Paste-friendly one-time codes with separated, expressive cells.</p></div>
<DemoSection title="Numeric code" item="input-otp" source={'<InputOtp bind:value />'}><div data-demo-section="numeric"><InputOtp bind:value onComplete={(code) => status = `Completed: ${code}`} /><p>{status}</p></div></DemoSection>
<DemoSection title="Masked" item="input-otp"><div data-demo-section="masked"><InputOtp value="secret" type="text" masked color="dark" /></div></DemoSection>
<DemoSection title="Validation states" item="input-otp"><div class="stack" data-demo-section="states"><InputOtp value="482910" state="success" /><InputOtp value="120" state="danger" /></div></DemoSection>
<style>.stack { display:grid; gap:1rem; }</style>
