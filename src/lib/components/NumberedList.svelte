<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "$lib/types";
	import Text from "./Text.svelte";
    interface Props {
        block: NumberedListItemBlockObjectResponse;
    }

    let { block }: Props = $props();
</script>

{#if block && block.numbered_list_item.rich_text.length>0}
    <ul class="sk-blog-list-ul">
        <li class="sk-blog-list-li mb-2">
            {#each block.numbered_list_item.rich_text as text}
                <Text {text} />
            {/each}
        </li>
    </ul>
{/if}