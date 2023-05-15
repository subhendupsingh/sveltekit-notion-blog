<script lang="ts">
	import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import { Image } from "@unpic/svelte";
    export let block: ImageBlockObjectResponse;
</script>

{#if block.image}
    {#if block.image.type=="file"}
        <Image src={block.image.file.url} layout="fullWidth" aspectRatio={16/9} class="aspect-video object-cover rounded-md" />
        {#if block.image.caption?.length > 0}
            <p class="w-full text-xs text-gray-400 text-center">{block.image.caption?.[0].plain_text}</p>
        {/if}
    {:else if block.image.type=="external"}
        <Image src={block.image.external.url} layout="fullWidth" aspectRatio={16/9} class="aspect-video object-cover rounded-md" />
        {#if block.image.caption?.length > 0}
            <p class="w-full text-xs text-gray-400 text-center">{block.image.caption?.[0].plain_text}</p>
        {/if}
    {/if}
{/if}