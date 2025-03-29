<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "$lib/types";
	import Text from "./Text.svelte";
    interface Props {
        block: { type: "grouped_numbered_list", items: NumberedListItemBlockObjectResponse[]};
    }

    let { block }: Props = $props();
</script>

{#if block && block.items.length> 0}
    <ul class="sk-blog-list-ul sk-blog-numbered-list">
        {#each block.items as item}
            <li class="sk-blog-list-li">
                {#if item.numbered_list_item.rich_text.length > 0}
                    {#each item.numbered_list_item.rich_text as text }
                        <Text {text} />
                    {/each}
                {/if}
            </li>
        {/each}
    </ul>
{/if}