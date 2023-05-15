<script lang="ts">
	import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
    export let text: RichTextItemResponse;
</script>

{#if text}
    <p style:font-weight={text.annotations.bold ? "bold": "normal"} style:font-style={text.annotations.italic ? "italic": "normal"}>{text.plain_text}</p>
{/if}