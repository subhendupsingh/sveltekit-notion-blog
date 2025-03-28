<script lang="ts">
	import type { ParagraphBlockObjectResponse } from "$lib/types";
	import Text from "./Text.svelte";

    interface Props {
        paragraph: ParagraphBlockObjectResponse;
    }

    let { paragraph }: Props = $props();
</script>

{#if paragraph?.paragraph?.rich_text?.length > 0}
    <p class="my-4">
        {#each paragraph.paragraph.rich_text as para }
            {#if para.href}
                    <a href={para.href} target="_blank" class="!text-orange-500 underline underline-offset-2">
                        <Text text={para} />
                    </a>
            {:else}
                    <Text text={para} />
            {/if}
        {/each}
    </p>
{/if}