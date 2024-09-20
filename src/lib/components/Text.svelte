<script lang="ts">
	import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
    export let text: RichTextItemResponse;

    const processAnnotations = (annotations: RichTextItemResponse["annotations"]) => {
        let style =``;
        if(annotations.bold) {
            style += "font-weight: bold;";
        }

        if(annotations.italic) {
            style += "font-style: italic;";
        }

        if(annotations.underline) {
            style += "text-decoration: underline;";
        }

        if(annotations.strikethrough) {
            style += "text-decoration: line-through;";
        }

        if(annotations.code) {
            style += "font-family: monospace; color: #EB5757;";
        }

        return style;
    }
</script>

{#if text}
    <span class="sk-blog-body" style={processAnnotations(text.annotations)}>
        {text.plain_text}
    </span>
{/if}