<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Text from "./Text.svelte";
    export let block: NumberedListItemBlockObjectResponse;
</script>

{#if block && block.numbered_list_item.rich_text?.length> 0}
    {#each  block.numbered_list_item.rich_text as item }
        <Text text={item} />
    {/each}
{/if}