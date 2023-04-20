<script lang="ts">
	import type { TableOfContentItems } from "$lib/types";
    export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
    
</script>

{#if tableOfContent && tableOfContent.length > 0 && !tableOfContent?.some((s)=> s==null)}
    <ul class="bg-slate-100 rounded-md w-full py-6 list-none">
        {#each  tableOfContent as content }
            {#if content}
                {#if content.type == "heading_2"}
                    <li class="text-base"><a class="no-underline" href={"#"+content.id}>{content.text}</a></li>
                {:else if content.type == "heading_3"}
                    <li class="indent-4 text-sm"><a class="no-underline" href={"#"+content.id}>{content.text}</a></li>
                {/if}    
            {/if}
        {/each}
    </ul>
{/if}

<style>
    a {
        @apply text-slate-700;
    }
</style>