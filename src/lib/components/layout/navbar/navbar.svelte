<script lang="ts">
	import { page } from '$app/state';
	import { navbarMenu } from './navbar-menu';
	import NavbarListener from './navbar-listener.svelte';

	let currentPath = $derived(page.url.pathname);

	const isActive = (href: string, currentPath: string) => {
		if (currentPath === href) return true;
		if (href !== '/' && currentPath.startsWith(href + '/')) return true;
		return false;
	};

	const getHighlightedParts = (title: string, key: string) => {
		if (!title || !key || key.length !== 1) return { before: title, highlighted: null, after: null };

		const index = title.toLowerCase().indexOf(key.toLowerCase());

		// Key not found in title
		if (index === -1) return { before: title, highlighted: null, after: null };

		// Return the parts, preserving original case for the highlighted character
		return {
			before: title.substring(0, index),
			highlighted: title.substring(index, index + 1), // Get the char from original title
			after: title.substring(index + 1)
		};
	};
</script>

<NavbarListener />

<nav class="overflow-x-auto text-sm select-none md:text-base lg:px-4 lg:py-3">
	<div class="hidden items-center justify-between gap-2 px-2 lg:flex lg:px-0">
		<div class="flex items-center gap-2">
			<div class="bg-ash-200 h-4 w-1.5"></div>
			<a class="flex items-center" href="https://github.com/songhanpoo/site" target="_blank" rel="norreferrer">
				<svg
					class="mr-1 h-3 w-3"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="6" x2="6" y1="3" y2="15"></line>
					<circle cx="18" cy="6" r="3"></circle>
					<circle cx="6" cy="18" r="3"></circle>
					<path d="M18 9a9 9 0 0 1-9 9"></path>
				</svg>
				main
			</a>
		</div>
		<p>-- EXPLORE MORE --</p>
	</div>
	<div class="flex items-center justify-between gap-20 overflow-x-auto px-2 py-3 leading-none lg:px-0 lg:py-0">
		<ul class="flex items-center">
			{#each navbarMenu as { title, href, key }, i (i)}
				{@const parts = getHighlightedParts(title, key)}
				{@const isOnCurrentPath = isActive(href, currentPath)}

				<li class="shrink-0">
					<a
						{href}
						data-sveltekit-preload-code="eager"
						data-sveltekit-preload-data
						class={`text-ash-300 flex items-center px-2 py-0.5 leading-none transition-all ${isOnCurrentPath ? 'bg-ash-300 text-ash-800' : ''}`}
						aria-label={`${title} (Shortcut: ${key})`}
					>
						{parts.before}{#if parts.highlighted}<span class={`${isOnCurrentPath ? 'text-ash-800' : 'text-ash-100'} transition-all`}>{parts.highlighted}</span
							>{/if}{parts.after}
					</a>
				</li>
			{/each}
		</ul>
		<div class="not-sr-only hidden items-center gap-2 lg:flex">
			<a class="flex gap-x-1 items-center shrink-0 px-2 py-0.5 leading-none text-gray-200" href="https://github.com/songhanpoo" target="_blank" rel="noreferrer">

			<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" 					class="size-5"
 xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
				Github</a>

		<a class="flex gap-x-1 items-center shrink-0 px-2 py-0.5 leading-none text-gray-200" href="https://www.linkedin.com/in/songhanpoo" target="_blank" rel="noreferrer">

			<svg class="size-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
				Linkedin</a>
		</div>
	</div>
</nav>
