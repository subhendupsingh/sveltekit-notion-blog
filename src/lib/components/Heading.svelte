<script lang="ts">
	import type { Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse;
</script>

{#if heading}
    {#if heading.type=="heading_1"}
        <h1 id={heading.id}>{heading.heading_1.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h1>
    {:else if heading.type=="heading_2"}
        <h2 id={heading.id}>{heading.heading_2.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h2>
    {:else if heading.type=="heading_3"}
        <h3 id={heading.id} class="">{heading.heading_3.rich_text?.map((t)=> t.plain_text)?.join(" ")}</h3>
    {/if}
{/if}