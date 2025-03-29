<script lang="ts">
	import type { TableOfContentItems } from '$lib/types';
	interface Props {
		tableOfContent: (TableOfContentItems | undefined)[] | undefined;
	}

	let { tableOfContent }: Props = $props();

	//method to slugify
	function slugify(text: string) {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w\-]+/g, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}
</script>

<h3 class="sk-blog-h3">Table of Contents</h3>

{#if tableOfContent && tableOfContent?.length > 0}
	<ul class="sk-blog-toc-ul">
		{#each tableOfContent as content}
			{#if content}
				{#if content.type == 'heading_2'}
					<li class="sk-blog-toc-li-h2">
						<a href={'#' + slugify(content.text)}>{content.text}</a>
					</li>
				{:else if content.type == 'heading_3'}
					<li class="sk-blog-toc-li-h3">
						<a href={'#' + slugify(content.text)}>{content.text}</a>
					</li>
				{/if}
			{/if}
		{/each}
	</ul>
{/if}