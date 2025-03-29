<script lang="ts">
	import Block from "./Block.svelte";
	import TableOfContent from "./TableOfContent.svelte";
	import type { FAQ, TableOfContentItems, UserObjectResponse } from "$lib/types";
	import { Image } from "@unpic/svelte";
	import Faq from "./FAQ.svelte";
	import type { CustomBlockObjectResponse } from "../notion/api";

    interface Props {
        blocks: CustomBlockObjectResponse[] | undefined;
        tableOfContent: (TableOfContentItems | undefined)[] | undefined;
        title: string | undefined;
        cover: string | undefined;
        faqs: FAQ[] | undefined | null;
        author: UserObjectResponse | undefined | null;
        published: string | undefined | null;
    }

    let {
        blocks,
        tableOfContent,
        title,
        cover,
        faqs,
        author,
        published
    }: Props = $props();
</script>

<div class="sk-blog-post-container">
    {#if blocks && blocks.length >0}
        <article class="sk-blog-post">
            {#if title}
                <h1 class="sk-blog-h1">{title}</h1>
            {/if}

            <div class="sk-blog-post-header">
                {#if published}
                    <small class="sk-blog-published">Published : {published}</small>
                {/if}

                {#if author}
                    <div class="flex gap-2 items-center">
                        <img src={author.avatar_url} alt={author.name} class="sk-blog-avatar" />
                        <small class="sk-blog-author">{ author.name }</small>
                    </div>
                {/if}
            </div>
            

            {#if cover}
                <Image src={cover} layout="fullWidth" aspectRatio={16/9} class="my-6 rounded-xl aspect-video object-cover max-h-[500px] w-full sk-blog-post-cover-image" />
            {/if}

            <TableOfContent {tableOfContent} />
            
            {#each blocks as block}
                <Block {block} />
            {/each}

            {#if faqs && faqs.length > 0}
                <Faq {faqs} />
            {/if}
        </article>
    {/if}
</div>