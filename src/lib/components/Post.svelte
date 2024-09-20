<script lang="ts">
	import type { BlockObjectResponse, UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Block from "./Block.svelte";
	import TableOfContent from "./TableOfContent.svelte";
	import type { FAQ, TableOfContentItems } from "$lib/types";
	import { Image } from "@unpic/svelte";
	import Faq from "./FAQ.svelte";
	import type { CustomBlockObjectResponse } from "../notion/api";

    export let blocks: CustomBlockObjectResponse[] | undefined;
    export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
    export let title: string | undefined;
    export let cover: string | undefined;
    export let faqs: FAQ[] | undefined | null;
    export let author: UserObjectResponse | undefined | null;
    export let published: string | undefined | null;
</script>

<div class="max-w-6xl mx-auto lg:text-lg">
    {#if blocks && blocks.length >0}
        <article class="mt-8 mx-auto">
            {#if title}
                <h1 class="sk-blog-h1">{title}</h1>
            {/if}

            <div class="flex justify-between items-center">
                {#if published}
                    <small class="font-public text-gray-600 text-sm py-4">Published : {published}</small>
                {/if}

                {#if author}
                    <div class="flex gap-2 items-center">
                        <img src={author.avatar_url} alt={author.name} class="rounded-full h-5 w-5 aspect-square" />
                        <small class="font-public text-gray-600 text-sm">{ author.name }</small>
                    </div>
                {/if}
            </div>
            

            {#if cover}
                <Image src={cover} layout="fullWidth" aspectRatio={16/9} class="mt-6 rounded-xl aspect-video object-cover max-h-[500px] w-full" />
            {/if}

            <TableOfContent {tableOfContent} />
            
            {#each blocks as block}
                <Block {block} />
            {/each}

            {#if faqs && faqs.length > 0}
            <!-- {JSON.stringify(faqs)} -->
                <Faq {faqs} />
            {/if}
        </article>
    {/if}
</div>