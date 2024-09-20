<script lang='ts'>
	import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import { codeToHtml } from 'shiki';
	import { onMount } from "svelte";

    export let block: CodeBlockObjectResponse;
    let html: string | undefined = undefined;
    const getCodeHighlight = async () => {
        const html = await codeToHtml(block.code.rich_text[0].plain_text, {
            lang: block.code.language,
            tabindex: 4,
            structure: "classic",
            themes: {
                light: "ayu-dark",
                dark: "ayu-dark"
            }
        })

        return html;
    }

    onMount(async () => {
         html = await getCodeHighlight();
    })
</script>


{#if html}
    <div class="max-w-full overflow-auto">
        {@html html}
    </div>
{/if}

<style lang="postcss">
    :global(.shiki) {
        overflow: auto;
        font-size: 10pt;
        padding: 24px;
        border-radius: 12px;
    }
</style>