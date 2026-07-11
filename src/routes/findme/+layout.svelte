<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<section class="flex-1 flex-grow overflow-hidden" >
	{@render children()}
</section>
