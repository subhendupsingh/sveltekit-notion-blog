<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "$lib/types";
	import Text from "./Text.svelte";
    interface Props {
        block: NumberedListItemBlockObjectResponse;
    }

    let { block }: Props = $props();
</script>

{#if block && block.numbered_list_item.rich_text.length>0}
    <ul class="list-inside py-2 list-disc marker:font-inter marker:text-base marker:text-gray-600 dark:marker:text-gray-200">
        <li class="list-item mb-2">
        {#each block.numbered_list_item.rich_text as text}
            <Text {text} />
        {/each}
        </li>
    </ul>
{/if}