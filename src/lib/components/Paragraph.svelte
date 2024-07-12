<script lang="ts">
	import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let paragraph: ParagraphBlockObjectResponse;
    let initialText = "";
    $: paraText = paragraph.paragraph?.rich_text?.reduce((accumulator, para)=> para.href ? accumulator + `<a href='${para.href}' target='_blank'>${para.plain_text}</a>`: accumulator + para.plain_text, initialText);
</script>

{#if paraText}
    <p class="sk-blog-body">{@html paraText}</p>
{/if}

<style lang="postcss">
    :global(.sk-blog-body) {
        @apply font-inter text-lg font-normal tracking-wide text-gray-600 dark:text-gray-200;
        @apply pt-4;
        line-height: 2.2rem !important;
    }
</style>