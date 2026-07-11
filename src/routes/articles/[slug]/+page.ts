import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Article } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../contents/articles/${params.slug}.md`);
		const currentMeta = post.metadata as any;

		let nextArticle: Article | null = null;

		if (currentMeta && currentMeta.series) {
			const allPosts = import.meta.glob('../../../contents/articles/*.md', { eager: true });
			const seriesArticles: Article[] = [];

			for (const path in allPosts) {
				const file = allPosts[path] as any;
				const slug = path.split('/').at(-1)?.replace('.md', '');
				if (file && file.metadata && slug) {
					const metadata = file.metadata;
					if (metadata.series === currentMeta.series) {
						seriesArticles.push({
							title: metadata.title,
							description: metadata.description,
							publishedDate: metadata.publishedDate,
							poster: metadata.poster,
							slug,
							series: metadata.series,
							seriesPart: metadata.seriesPart
						});
					}
				}
			}

			// Sort by seriesPart ascending
			seriesArticles.sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0));

			const currentIndex = seriesArticles.findIndex((art) => art.slug === params.slug);
			if (currentIndex !== -1 && currentIndex < seriesArticles.length - 1) {
				nextArticle = seriesArticles[currentIndex + 1];
			}
		}

		return {
			content: post.default,
			meta: currentMeta,
			nextArticle
		};
	} catch (e) {
		console.error(e);
		error(404, `Could not find ${params.slug}`);
	}
};
