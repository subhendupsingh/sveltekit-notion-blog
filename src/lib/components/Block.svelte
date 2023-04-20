<script lang="ts">
	import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Heading from "./Heading.svelte";
	import Paragraph from "./Paragraph.svelte";
	import Table from "./FAQ.svelte";
	import ImageBlock from "./ImageBlock.svelte";
    export let block: BlockObjectResponse;
    //$: console.log(block.type, block);
    
</script>


{#if block.type=="heading_1"}
    <Heading heading={block} />
{:else if block.type=="heading_2"}
    <Heading heading={block} />
{:else if block.type=="heading_3"}
    <Heading heading={block} />
{:else if block.type=="paragraph"}
    <Paragraph paragraph={block} />
<!-- {:else if block.type=="table"}
    <Table /> -->
{:else if block.type=="image"}
    <ImageBlock {block} />
{/if}