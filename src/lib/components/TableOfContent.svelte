<script lang="ts">
	import type { TableOfContentItems } from "$lib/types";
    interface Props {
        tableOfContent: (TableOfContentItems | undefined)[] | undefined;
    }

    let { tableOfContent }: Props = $props();

    //method to slugify
    function slugify(text: string) {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
</script>

<h3 class="sk-blog-h3">Table of Contents</h3>

{#if tableOfContent && tableOfContent?.length > 0}
    <ul>
        {#each  tableOfContent as content }
            {#if content}
                {#if content.type == "heading_2"}
                    <li class="text-base font-semibold my-2.5"><a class="no-underline hover:underline underline-offset-2" href={"#"+(slugify(content.text))}>{content.text}</a></li>
                {:else if content.type == "heading_3"}
                    <li class="indent-4 text-sm font-semibold my-1"><a class="no-underline hover:underline underline-offset-2" href={"#"+(slugify(content.text))}>{content.text}</a></li>
                {/if}    
            {/if}
        {/each}
    </ul>
{/if}

<style lang="postcss">
    a {
        @apply text-zinc-600 dark:text-zinc-100 text-sm tracking-wide;
    }

    ul {
        @apply bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl my-6;
    }
</style>