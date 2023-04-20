<script lang="ts">
	import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let paragraph: ParagraphBlockObjectResponse;
    let initialText = "";
    $: paraText = paragraph.paragraph?.rich_text?.reduce((accumulator, para)=> para.href ? accumulator + `<a href='${para.href}' target='_blank'>${para.plain_text}</a>`: accumulator + para.plain_text, initialText);
</script>

{#if paraText}
    <p>{@html paraText}</p>
{/if}