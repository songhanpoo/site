<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<section class="flex-1">
	{@render children()}
</section>
