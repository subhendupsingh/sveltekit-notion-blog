<script lang="ts">
	import type { TableOfContentItems } from "$lib/types";
    export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
</script>

<h3>Table of Contents</h3>

{#if tableOfContent && tableOfContent?.length > 0}
    <ul>
        {#each  tableOfContent as content }
            {#if content}
                {#if content.type == "heading_2"}
                    <li class="text-base font-semibold my-2.5"><a class="no-underline" href={"#"+content.id}>{content.text}</a></li>
                {:else if content.type == "heading_3"}
                    <li class="indent-4 text-sm font-semibold my-1"><a class="no-underline" href={"#"+content.id}>{content.text}</a></li>
                {/if}    
            {/if}
        {/each}
    </ul>
{/if}

<style>
    a {
        @apply text-slate-700;
    }

    ul {
        background-color: rgb(248 250 252 / 1);
        list-style-type: none;
        padding: 4px;
        border-radius: 0.375rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        padding-left: 1.5rem;
    }
</style>