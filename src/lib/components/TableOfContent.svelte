<script lang="ts">
	import type { TableOfContentItems } from "$lib/types";
    export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
</script>

<h3 class="sk-blog-h3">Table of Contents</h3>

{#if tableOfContent && tableOfContent?.length > 0}
    <ul>
        {#each  tableOfContent as content }
            {#if content}
                {#if content.type == "heading_2"}
                    <li class="text-base font-semibold my-2.5"><a class="no-underline hover:underline underline-offset-2" href={"#"+content.id}>{content.text}</a></li>
                {:else if content.type == "heading_3"}
                    <li class="indent-4 text-sm font-semibold my-1"><a class="no-underline hover:underline underline-offset-2" href={"#"+content.id}>{content.text}</a></li>
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