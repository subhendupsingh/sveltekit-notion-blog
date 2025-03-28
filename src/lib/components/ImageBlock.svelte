<script lang="ts">
	import type { ImageBlockObjectResponse } from "$lib/types";
	import { Image } from "@unpic/svelte";
    interface Props {
        block: ImageBlockObjectResponse;
    }

    let { block }: Props = $props();
</script>

{#if block.image}
    {#if block.image.type=="file"}
        <Image src={block.image.file.url} layout="fullWidth" aspectRatio={0} class="aspect-auto object-contain rounded-xl mt-4" />
        {#if block.image.caption?.length > 0}
            <p class="w-full text-xs text-gray-400 text-center">{block.image.caption?.[0].plain_text}</p>
        {/if}
    {:else if block.image.type=="external"}
        <Image src={block.image.external.url} layout="fullWidth" aspectRatio={0} class="aspect-auto object-contain rounded-xl mt-4" />
        {#if block.image.caption?.length > 0}
            <p class="w-full text-xs text-gray-400 text-center">{block.image.caption?.[0].plain_text}</p>
        {/if}
    {/if}
{/if}