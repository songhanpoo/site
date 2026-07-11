<!-- src/routes/articles/+layout.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- Clean container layout that allows children to expand to max-w-6xl naturally -->
<div class="min-h-screen w-full bg-transparent px-4 py-10 sm:px-6 lg:px-8">
	<main class="mx-auto w-full">
		{@render children()}
	</main>
</div>
