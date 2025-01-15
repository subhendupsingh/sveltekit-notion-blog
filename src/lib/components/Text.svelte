<script lang="ts">
	import type { RichTextItemResponse } from "$lib/types";
	import { processAnnotations } from "$lib/types/helpers";

    export let text: RichTextItemResponse;
</script>

{#if text}
    <span class="sk-blog-body" style={processAnnotations(text.annotations)}>
        {text.plain_text}
    </span>
{/if}