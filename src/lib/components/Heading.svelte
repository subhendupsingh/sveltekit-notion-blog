<script lang="ts">
	import type { Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse;
</script>

{#if heading}
    {#if heading.type=="heading_1"}
        <h1 class="sk-blog-h1" id={heading.id}>{heading.heading_1.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h1>
    {:else if heading.type=="heading_2"}
        <h2 class="sk-blog-h2" id={heading.id}>{heading.heading_2.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h2>
    {:else if heading.type=="heading_3"}
        <h3 class="sk-blog-h3" id={heading.id}>{heading.heading_3.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h3>
    {/if}
{/if}

<style lang="postcss">
    :global(.sk-blog-h1) {
        @apply font-inter text-4xl font-extrabold leading-normal dark:text-gray-300;
    }

    :global(.sk-blog-h2) {
        @apply font-inter text-2xl font-bold leading-normal pt-8 dark:text-gray-300;
    }

    :global(.sk-blog-h3) {
        @apply font-inter text-xl font-bold leading-normal pt-8 dark:text-gray-300;
    }
</style>