<script lang="ts">
	import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Heading from "./Heading.svelte";
	import Paragraph from "./Paragraph.svelte";
	import ImageBlock from "./ImageBlock.svelte";
	import NumberedListGroup from "./NumberedListGroup.svelte";
	import BulletList from "./BulletList.svelte";
	import Embed from "./Embed.svelte";
	import type { CustomBlockObjectResponse } from "../notion/api";
	import Code from "./Code.svelte";
	import NumberedList from "./NumberedList.svelte";
    export let block: CustomBlockObjectResponse;
</script>


{#if block.type=="heading_1"}
    <Heading heading={block} />
{:else if block.type=="heading_2"}
    <Heading heading={block} />
{:else if block.type=="heading_3"}
    <Heading heading={block} />
{:else if block.type=="paragraph"}
    <Paragraph paragraph={block} />
{:else if block.type=="numbered_list_item"}
    <NumberedList {block} />
{:else if block.type=="bulleted_list_item"}
    <BulletList {block} />
{:else if block.type=="image"}
    <ImageBlock {block} />
{:else if block.type=="embed"}
    <Embed {block} />
{:else if block.type=="grouped_numbered_list"}
    <NumberedListGroup {block} />
{:else if block.type=="code"}
    <Code {block} />
{/if}