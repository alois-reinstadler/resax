<script lang="ts">import { Card } from './index'; import type { CardProps } from './card.svelte'; let { variant = 'default', href }: Pick<CardProps, 'variant' | 'href'> = $props();</script>
<Card {variant} {href} data-testid="card">Card body{#snippet footer()}<button type="button">Action</button>{/snippet}</Card>
