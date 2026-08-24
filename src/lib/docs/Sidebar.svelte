<script lang="ts">
	import { nav } from './nav';
</script>

<aside class="sidebar">
	<a class="brand" href="/">Resax</a>
	<nav aria-label="Components">
		{#each nav as group}
			<section class="nav-group">
				<h2>{group.category}</h2>
				<ul>
					{#each group.items as item}
						<li><a class:disabled={!item.built} href={`/components/${item.slug}`} aria-disabled={!item.built}>{item.name}</a></li>
					{/each}
				</ul>
			</section>
		{/each}
	</nav>
</aside>
