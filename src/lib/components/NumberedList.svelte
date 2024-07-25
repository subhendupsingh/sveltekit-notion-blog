<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Text from "./Text.svelte";
    export let block: NumberedListItemBlockObjectResponse;
</script>

{#if block && block.numbered_list_item.rich_text?.length> 0}
    <ul class="list-inside py-2">
        <li class="list-item">
            {#if block.numbered_list_item.rich_text[0]}
                <Text text={block.numbered_list_item.rich_text[0]} />
            {/if}

            {#if block.numbered_list_item.rich_text[1]}
                <Text text={block.numbered_list_item.rich_text[1]} />
            {/if}
        </li>
    </ul>
{/if}