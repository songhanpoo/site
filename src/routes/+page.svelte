<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';

	const asciiArt = atob(
		'IF9fX18gICAgX19fX19fICBfXyAgX18gIF9fICAgICAgICAgIF9fICBfXyAgX19fXyAgICBfXyAgX18gICBfXyAgICBfXyAgX19fXyAgICBfXyAgX18gICAgIAovXCAgX2BcIC9cICBfICBcL1wgXC9cIFwvXCBcICAgICAgICAvXCBcL1wgXC9cICBfYFwgL1wgXC9cIFwgL1wgXCAgL1wgXC9cICBfYFwgL1wgXC9cIFwgICAgClwgXCBcTFwgXCBcIFxMXCBcIFwgXCBcIFwgXCBcICAgICAgIFwgXCBgXFwgXCBcIFxMXF9cIFwgXCBcIFxcIGBcYFxcLycvXCBcIFxMXF9cIFwgYFxcIFwgICAKIFwgXCAsX18vXCBcICBfXyBcIFwgXCBcIFwgXCBcICBfXyAgIFwgXCAsIGAgXCBcIFxMX0xcIFwgXCBcIFxgXCBgXCAvJyAgXCBcICBfXExcIFwgLCBgIFwgIAogIFwgXCBcLyAgXCBcIFwvXCBcIFwgXF9cIFwgXCBcTFwgXCAgIFwgXCBcYFwgXCBcIFwvLCBcIFwgXF9cIFwgYFwgXCBcICAgXCBcIFxMXCBcIFwgXGBcIFwgCiAgIFwgXF9cICAgXCBcX1wgXF9cIFxfX19fX1wgXF9fX18vICAgIFwgXF9cIFxfXCBcX19fXy9cIFxfX19fL1wgIFwgXF9cICAgXCBcX19fXy9cIFxfXCBcX1wKICAgIFwvXy8gICAgXC9fL1wvXy9cL19fX19fL1wvX19fLyAgICAgIFwvXy9cL18vXC9fX18vICBcL19fX19fLyAgIFwvXy8gICAgXC9fX18vICBcL18vXC9fLwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK'
	);
</script>

<Metadata
	title="PaulNguyen"
	description="Hi, I’m Paul Nguyen! Welcome to my blogs. I’m a DevOps engineer and tech enthusiast who loves building clean, efficient, and creative solutions. This site, crafted with Next.js and Tailwind CSS, showcases my projects, portfolio, and technical expertise. Whether you’re looking for collaboration, inspiration, or just curious about my work, feel free to reach out!"
	image="https://paulnguyen.dev/assets/homepage-preview.png"
/>

<section class="md:-p-8 flex flex-grow flex-col items-center justify-center space-y-2.5 px-4 md:space-y-5">
	<!-- <h1 class="block font-mono text-3xl font-bold tracking-tight text-center md:hidden"> -->
	<!-- 	HIEU NGUYEN -->
	<!-- </h1> -->
	<div class="scrollbar-none flex w-full justify-center overflow-x-hidden p-4 md:p-8">
		<code class="block font-mono text-[1.2vw] leading-none tracking-normal whitespace-pre">{asciiArt}</code>
	</div>
	<p class="sr-only">Paul Nguyen</p>

	<div class="max-w-xl px-4 text-center">
		<p class="mb-1 text-lg font-semibold">A Lifelong Learner</p>
		<p class="text-muted-foreground text-sm leading-relaxed md:text-base">
			I am a Vietnamese Open Source contributor, DevOps enthusiast, and coffee lover—always learning new things and ready to discuss new projects.
		</p>
	</div>
</section>
