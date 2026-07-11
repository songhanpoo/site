<script lang="ts">
	import { tick } from 'svelte';
	import Metadata from '$lib/components/metadata.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	interface TocItem {
		text: string;
		id: string;
		level: number;
	}

	let headings = $state<TocItem[]>([]);
	let articleElement = $state<HTMLElement | null>(null);

	// State to track if the mobile TOC drawer is open
	let isMobileMenuOpen = $state(false);

	$effect(() => {
		if (!articleElement) return;

		tick().then(() => {
			const headingElements = articleElement!.querySelectorAll('h2, h3, h4');
			const parsedHeadings: TocItem[] = [];

			headingElements.forEach((el, index) => {
				if (!el.id) {
					el.id = `heading-${index}-${el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
				}

				parsedHeadings.push({
					text: el.textContent || '',
					id: el.id,
					level: parseInt(el.tagName.substring(1))
				});
			});

			headings = parsedHeadings;
		});
	});
</script>

<Metadata title={data.meta.title + ' | HieuNguyen'} description={data.meta.description} image={data.meta.poster} />

<div class="relative mx-auto w-full max-w-4xl px-4">
	<header class="group border-ash-700 bg-ash-700 relative mb-8 aspect-video overflow-hidden rounded-xl border lg:aspect-[3/1]">
		<img src={data.meta.poster} alt={data.meta.title} class="size-full object-cover object-center" />
		<div class="absolute top-0 left-0 grid h-full w-full place-items-center bg-[#080808]/80 transition-opacity duration-500 group-hover:opacity-0">
			<h1 class="max-w-[80%] px-4 text-center text-xl font-semibold uppercase lg:max-w-[70%] lg:text-3xl">
				{data.meta.title}
			</h1>
		</div>
		<p
			class="absolute bottom-2 left-1/2 w-full -translate-x-1/2 text-center text-xs opacity-100 transition-opacity duration-500 group-hover:opacity-0 lg:text-sm"
		>
			Published on {data.meta.publishedDate}
		</p>
		<div
			aria-hidden="true"
			class="absolute top-0 left-0 h-full w-full bg-repeat opacity-[2%] group-hover:opacity-0"
			style="background-image: url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
		></div>
	</header>

	<div class="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[200px_1fr]">
		{#if headings.length > 0}
			<aside class="bg-ash-800/10 border-ash-700/30 hidden w-full rounded-xl border p-4 font-sans lg:sticky lg:top-6 lg:block">
				<h2 class="text-ash-400 mb-3 text-[11px] font-bold tracking-wider uppercase">On This Page</h2>
				<nav class="space-y-2">
					{#each headings as heading}
						<a
							href="#{heading.id}"
							class="text-ash-400 hover:text-ash-200 block text-xs leading-normal transition-colors"
							style="padding-left: {(heading.level - 2) * 0.5 + 'rem'}; font-weight: {heading.level === 2 ? '500' : '400'}"
						>
							{#if heading.level > 2}
								<span class="text-ash-600 mr-0.5 opacity-60">↳</span>
							{/if}
							{heading.text}
						</a>
					{/each}
				</nav>
			</aside>

			<button
				onclick={() => (isMobileMenuOpen = true)}
				class="bg-ash-800 border-ash-700 text-ash-200 fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 font-sans text-xs font-semibold shadow-xl transition-transform active:scale-95 lg:hidden"
				aria-label="Open Table of Contents"
			>
				<span>☰</span> Table of Contents
			</button>

			{#if isMobileMenuOpen}
				<div role="presentation" onclick={() => (isMobileMenuOpen = false)} class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"></div>

				<div
					class="border-ash-700 fixed right-0 bottom-0 left-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t bg-[#121212] p-6 font-sans shadow-2xl lg:hidden"
				>
					<div class="border-ash-700/50 mb-5 flex items-center justify-between border-b pb-3">
						<h2 class="text-ash-400 text-xs font-bold tracking-wider uppercase">On This Page</h2>
						<button onclick={() => (isMobileMenuOpen = false)} class="text-ash-400 hover:text-ash-200 p-1 text-sm"> ✕ </button>
					</div>
					<nav class="space-y-4 pb-6">
						{#each headings as heading}
							<a
								href="#{heading.id}"
								onclick={() => (isMobileMenuOpen = false)}
								class="text-ash-300 hover:text-ash-100 block text-sm transition-colors"
								style="padding-left: {(heading.level - 2) * 1 + 'rem'}; font-weight: {heading.level === 2 ? '500' : '400'}"
							>
								{#if heading.level > 2}
									<span class="text-ash-600 mr-1 opacity-60">↳</span>
								{/if}
								{heading.text}
							</a>
						{/each}
					</nav>
				</div>
			{/if}
		{:else}
			<div class="hidden lg:block"></div>
		{/if}

		<article
			bind:this={articleElement}
			class="prose prose-hr:border-ash-600 prose-pre:bg-ash-800/20 prose-code:before:opacity-0 prose-code:after:opacity-0 prose-code:text-ash-200 prose-code:font-mono prose-pre:border prose-headings:text-ash-200 prose-p:text-ash-400 prose-strong:text-ash-200 prose-li:text-ash-400 prose-li:marker:text-ash-300 prose-a:text-ash-200 prose-blockquote:border-ash-500 prose-td:text-ash-300 prose-thead:border-ash-300 prose-tr:border-ash-500 w-full max-w-2xl overflow-x-hidden font-sans"
		>
			<data.content />
		</article>
	</div>
	{#if data.nextArticle}
		<div class="flex items-center justify-between">
			<div class="border-ash-700 mt-12 max-w-2xl border-t pt-8 font-sans">
				<p class="text-ash-500 mb-2 text-xs font-semibold tracking-wider uppercase">
					Next in {data.meta.series} series (Part {data.nextArticle.seriesPart})
				</p>
				<a
					href="/articles/{data.nextArticle.slug}"
					class="group border-ash-700 bg-ash-800/20 hover:bg-ash-800/50 hover:border-cyan hover:shadow-cyan/5 flex items-center justify-between rounded-xl border p-5 transition-all duration-300 hover:shadow-lg"
				>
					<div class="space-y-1 pr-4">
						<h3 class="text-ash-200 group-hover:text-cyan text-base font-semibold transition-colors duration-200">
							{data.nextArticle.title}
						</h3>
						<p class="text-ash-400 line-clamp-2 text-sm">
							{data.nextArticle.description}
						</p>
					</div>
					<div class="text-ash-400 group-hover:text-cyan flex-shrink-0 transition-all duration-200 group-hover:translate-x-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
						>
					</div>
				</a>
			</div>
		</div>
	{/if}
</div>
