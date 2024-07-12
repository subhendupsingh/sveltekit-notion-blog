<script lang="ts">
	import type { BulletedListItemBlockObjectResponse, NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Text from "./Text.svelte";
    export let block: BulletedListItemBlockObjectResponse;
</script>

{#if block && block.bulleted_list_item?.rich_text.length > 0}
    <ul class="list-disc list-inside">    
        {#each  block.bulleted_list_item.rich_text as item }
            <li class="list-item sk-blog-body lg:indent-4">{item.plain_text}</li>    
        {/each}
    </ul>
{/if}