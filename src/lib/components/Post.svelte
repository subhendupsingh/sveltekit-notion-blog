<script lang="ts">
	import type { BlockObjectResponse, UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Block from "./Block.svelte";
	import TableOfContent from "./TableOfContent.svelte";
	import type { FAQ, TableOfContentItems } from "$lib/types";
	import { Image } from "@unpic/svelte";
	import Faq from "./FAQ.svelte";

    export let blocks: BlockObjectResponse[] | undefined;
    export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
    export let title: string | undefined;
    export let cover: string | undefined;
    export let faqs: FAQ[] | undefined | null;
    export let author: UserObjectResponse | undefined | null;
    export let published: string | undefined | null;
</script>

<div class="max-w-prose mx-auto lg:text-lg">
    {#if blocks && blocks.length >0}
        <article class="mt-8 prose prose-slate mx-auto lg:prose-lg">
            {#if title}
                <h1>{title}</h1>
            {/if}

            <div class="flex justify-between items-center">
                {#if published}
                    <small class="">Published : {published}</small>
                {/if}

                {#if author}
                    <div class="flex gap-2 items-center">
                        <img src={author.avatar_url} alt={author.name} class="rounded-full h-5 w-5 aspect-square" />
                        <small class="">{ author.name }</small>
                    </div>
                {/if}
            </div>
            

            {#if cover}
                <Image src = {cover} layout="fullWidth" aspectRatio={16/9} class="rounded-md aspect-video object-cover max-h-[500px] w-full" />
            {/if}

            <TableOfContent {tableOfContent} />
            
            {#each blocks as block}
                <div class="my-4">
                    <Block {block} />
                </div>
            {/each}

            {#if faqs && faqs.length > 0}
                <Faq {faqs} />
            {/if}
        </article>
    {/if}
</div>