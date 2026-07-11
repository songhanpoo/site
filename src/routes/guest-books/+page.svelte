<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createWebHaptics } from 'web-haptics/svelte';

	import Metadata from '$lib/components/metadata.svelte';

	import { getGuestsBook, insertGuestBook, toggleLikeGuestBook, deleteGuestBook } from './data.remote';

	const { trigger, destroy } = createWebHaptics();

	let content = $state('');
	let isSubmitting = $state(false);
	let isInputFocused = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!content || content.trim().length < 3 || content.length > 140) return;

		isSubmitting = true;
		try {
			await insertGuestBook({ content });
			content = '';
		} catch (err) {
			console.error('Failed to submit guest book entry:', err);
		} finally {
			isSubmitting = false;
		}
	}

	function formatDate(date: Date | string) {
		return new Date(date)
			.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
			.replace(',', '')
			.replace(/\//g, '-');
	}

	onDestroy(destroy);
</script>

<Metadata
	title="Guest Book | PaulNguyen"
	description="Leave a lasting imprint on my digital canvas! Sign in and share your thoughts, greetings, or anecdotes on my guest-book page. Your messages contribute to the heart and soul of my online community."
/>

<h1 class="sr-only">Wisnu Wicaksono's Guest Book</h1>

<section class="flex min-h-0 flex-1 grow flex-col space-y-4 overflow-y-auto px-3 py-2 lg:px-4">
	{#await getGuestsBook()}
		<div class="grid h-full w-full flex-1 place-items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="animate-spin"
			>
				<path d="M12 2v4" />
				<path d="m16.2 7.8 2.9-2.9" />
				<path d="M18 12h4" />
				<path d="m16.2 16.2 2.9 2.9" />
				<path d="M12 18v4" />
				<path d="m4.9 19.1 2.9-2.9" />
				<path d="M2 12h4" />
				<path d="m4.9 4.9 2.9 2.9" />
			</svg>
		</div>
	{:then { guestBooks, user }}
		<!-- Mock Neovim Window Wrapper -->
		<div class="border-ash-700 bg-ash-950 flex min-h-0 flex-grow flex-col overflow-hidden rounded-lg border shadow-2xl">
			<!-- Neovim Tabline -->
			<div class="bg-ash-900 border-ash-700 text-ash-400 flex items-center gap-2 border-b px-3 py-1 text-xs select-none">
				<div class="border-ash-700 text-ash-200 -mb-1.5 flex items-center gap-1.5 rounded-t border-x border-t bg-[#0c0c0c] px-3 py-1.5">
					<span class="text-cyan font-bold"></span> guestbooks.git
					<span class="text-[9px] text-green-400">●</span>
				</div>
				<div class="text-ash-600 hover:bg-ash-800 cursor-pointer rounded px-2 py-1 select-none">+</div>
			</div>

			<!-- Editor Pane (Scrollable timeline buffer) -->
			<div class="flex-1 space-y-6 overflow-y-auto bg-[#0c0c0c] p-4 md:p-6">
				{#if guestBooks.length === 0}
					<div class="text-ash-500 flex items-start font-mono text-xs">
						<div class="border-ash-700/50 mr-4 w-12 border-r pr-3 text-right select-none">1</div>
						<div>-- Buffer empty. Leave a message below using :w "your message" --</div>
					</div>
				{:else}
					{#each guestBooks as item, i (item.id)}
						<div class="flex items-start font-mono text-xs select-text">
							<!-- Vim Editor Line Numbers (6 lines per commit block) -->
							<div class="text-ash-500 border-ash-700/50 mr-4 w-12 border-r pr-3 text-right select-none">
								<div>{i * 6 + 1}</div>
								<div>{i * 6 + 2}</div>
								<div>{i * 6 + 3}</div>
								<div>{i * 6 + 4}</div>
								<div>{i * 6 + 5}</div>
								<div>{i * 6 + 6}</div>
							</div>

							<!-- Git log styled content -->
							<div class="min-w-0 flex-grow font-mono">
								<!-- commit line -->
								<div class="flex items-center gap-2">
									<span class="font-semibold text-yellow-500">commit {item.id < 0 ? '.......' : item.id.toString(16).padStart(7, '0')}</span>
									{#if item.id < 0}
										<span class="text-ash-800 bg-cyan animate-pulse rounded px-1 text-[10px] font-bold">PENDING</span>
									{/if}
									{#if item.likeCount > 0}
										<span class="text-cyan bg-cyan/10 flex items-center gap-0.5 rounded px-1 text-[10px]">
											󰗗 {item.likeCount}
											{item.likeCount === 1 ? 'like' : 'likes'}
										</span>
									{/if}
								</div>

								<!-- author line -->
								<div class="text-ash-400 mt-0.5">
									Author: <span class="text-cyan">~/{item.username.toLowerCase().replace(/\s/g, '-')}</span>
								</div>

								<!-- date line -->
								<div class="text-ash-500 mt-0.5 flex flex-wrap items-center justify-between gap-2">
									<span>Date: {formatDate(item.createdAt)}</span>

									<!-- actions styled as tags -->
									{#if user && item.id > 0}
										<div class="flex items-center gap-2 select-none">
											<button
												onclick={async () => {
													try {
														trigger();
													} catch (e) {}
													await toggleLikeGuestBook(item.id);
												}}
												class="flex items-center gap-1.5 rounded-sm border px-2 py-0.5 transition-colors duration-200
												{item.liked ? 'border-cyan/50 bg-cyan/10 text-cyan hover:bg-cyan/20' : 'border-ash-700 text-ash-400 hover:text-ash-200 hover:border-ash-500'}"
												aria-label={item.liked ? 'Unlike' : 'Like'}
												data-umami-event="guestbook-like"
												data-umami-event-action={item.liked ? 'unlike' : 'like'}
											>
												<svg width="10" height="10" viewBox="0 0 14 14" fill="none" class={item.liked ? 'fill-cyan stroke-cyan' : 'stroke-current'}>
													<path
														d="M11.0832 8.16667C11.9523 7.315 12.8332 6.29417 12.8332 4.95833C12.8332 4.10743 12.4952 3.29138 11.8935 2.6897C11.2918 2.08802 10.4757 1.75 9.62484 1.75C8.59817 1.75 7.87484 2.04167 6.99984 2.91667C6.12484 2.04167 5.4015 1.75 4.37484 1.75C3.52393 1.75 2.70788 2.08802 2.1062 2.6897C1.50452 3.29138 1.1665 4.10743 1.1665 4.95833C1.1665 6.3 2.0415 7.32083 2.9165 8.16667L6.99984 12.25L11.0832 8.16667Z"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
												<span>{item.liked ? 'liked' : 'like'}</span>
											</button>

											{#if item.userId === user.id}
												<button
													onclick={async () => await deleteGuestBook(item.id)}
													class="flex items-center gap-1 rounded-sm border border-red-950 bg-red-950/10 px-2 py-0.5 text-red-400 transition-colors hover:bg-red-950/30 hover:text-red-300"
													aria-label="Delete commit"
													data-umami-event="guestbook-delete"
												>
													<span>[✗ delete]</span>
												</button>
											{/if}
										</div>
									{/if}
								</div>

								<!-- spacer line -->
								<div class="text-ash-700/80 my-0.5">│</div>

								<!-- commit message block -->
								<div class="text-ash-100 border-cyan/30 my-0.5 rounded-r-md border-l-2 bg-[#141414]/30 py-1.5 pl-4">
									"{item.content}"
								</div>

								<!-- line break spacer -->
								<div class="text-ash-800 select-none">│</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Neovim Statusline -->
			<div class="bg-ash-900 border-ash-700 flex items-center justify-between border-t font-mono text-xs select-none">
				<div class="flex items-center">
					<!-- Mode block -->
					<span
						class="px-3 py-1 font-bold uppercase transition-all duration-300
						{isInputFocused ? 'text-ash-950 bg-green-500 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]' : 'bg-cyan text-ash-950 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]'}"
					>
						{isInputFocused ? 'INSERT' : 'NORMAL'}
					</span>

					<!-- File Info -->
					<span class="text-ash-200 border-ash-700 bg-ash-800 flex items-center gap-1.5 border-r px-3 py-1"> 󰈚 guestbooks.git </span>

					<!-- Format & OS -->
					<span class="text-ash-400 border-ash-700 hidden border-r px-3 py-1 sm:inline"> utf-8 [unix] </span>

					<!-- git branch -->
					<span class="text-ash-400 hidden px-3 py-1 md:inline">  main </span>
				</div>

				<div class="flex items-center">
					<!-- total commits -->
					<span class="text-ash-400 border-ash-700 border-l px-3 py-1">
						{guestBooks.length}
						{guestBooks.length === 1 ? 'commit' : 'commits'}
					</span>

					<!-- Vim location tracker -->
					<span class="bg-ash-800 text-ash-200 border-ash-700 xs:inline hidden border-l px-3 py-1">
						{isInputFocused ? '171:5' : '1:1'}
					</span>
				</div>
			</div>
		</div>

		<!-- Neovim Command-Line input box -->
		{#if user}
			<form class="mt-2 flex flex-col gap-2 font-mono text-xs" onsubmit={handleSubmit}>
				<div class="bg-ash-950 border-ash-700 group focus-within:border-cyan/50 flex items-center gap-2 rounded-lg border p-2.5 transition-colors duration-200">
					<span class="text-cyan font-bold select-none">:w</span>
					<input
						required
						type="text"
						minLength={3}
						name="content"
						bind:value={content}
						maxLength={140}
						autoComplete="off"
						disabled={isSubmitting}
						onfocus={() => (isInputFocused = true)}
						onblur={() => (isInputFocused = false)}
						placeholder={isSubmitting ? '"Saving changes..."' : '"Type your message here..."'}
						class="placeholder-opacity-40 placeholder:text-ash-500 caret-cyan text-ash-100 flex-grow border-none bg-transparent p-0 font-mono outline-none focus:ring-0 focus:outline-none"
					/>
					<button
						type="submit"
						onclick={() => {
							try {
								trigger();
							} catch (e) {}
						}}
						disabled={isSubmitting}
						class="bg-ash-800 hover:bg-ash-700 text-ash-200 border-ash-700 cursor-pointer rounded border px-3 py-1 font-bold transition-colors select-none"
						data-umami-event="guestbook-submit"
					>
						{isSubmitting ? 'Saving...' : 'Submit'}
					</button>
				</div>
			</form>
		{:else}
			<div class="bg-ash-950 border-ash-700 flex flex-col items-center justify-between gap-3 rounded-lg border p-3 font-mono text-xs sm:flex-row">
				<div class="text-ash-400 flex items-center gap-2">
					<span class="text-cyan font-bold select-none">:w</span>
					<span>Login with GitHub to leave a message in the guestbook</span>
				</div>
				<a
					onclick={() => {
						try {
							trigger();
						} catch (e) {}
					}}
					class="bg-ash-800 hover:bg-ash-700 text-ash-200 border-ash-700 flex w-full items-center justify-center gap-2 rounded border px-3 py-1.5 font-bold transition-colors select-none sm:w-auto"
					href="/api/auth"
					data-umami-event="guestbook-signin"
				>
					<svg width="12" height="12" fill="currentColor" viewBox="0 0 14 14">
						<path
							fill-rule="evenodd"
							d="M7.005 1C3.685 1 1 3.75 1 7.152c0 2.72 1.72 5.022 4.106 5.836.298.062.408-.132.408-.295 0-.143-.01-.631-.01-1.14-1.67.366-2.018-.734-2.018-.734-.269-.713-.667-.896-.667-.896-.546-.377.04-.377.04-.377.607.04.925.631.925.631.537.937 1.402.673 1.75.51.05-.398.208-.673.377-.826C4.58 9.72 3.177 9.19 3.177 6.826c0-.672.239-1.222.617-1.65-.06-.153-.269-.784.06-1.63 0 0 .506-.163 1.65.632.49-.135.994-.203 1.501-.204.507 0 1.024.071 1.501.204 1.144-.795 1.65-.632 1.65-.632.329.846.12 1.477.06 1.63.388.428.617.978.617 1.65 0 2.363-1.402 2.883-2.744 3.035.218.194.407.56.407 1.141 0 .825-.01 1.487-.01 1.691 0 .163.11.357.408.296C11.28 12.172 13 9.872 13 7.152 13.01 3.75 10.316 1 7.005 1z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Sign In</span>
				</a>
			</div>
		{/if}
	{/await}
</section>
