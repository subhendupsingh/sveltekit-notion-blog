<script lang="ts">
	import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    export let block:  EmbedBlockObjectResponse;

    //$: url = block?.embed?.url;

    const isImage = (url: string) => {
        return url.indexOf(".jpg") >=0 || url.indexOf(".png") >=0 || url.indexOf(".jpeg") >=0 || url.indexOf(".webp") >=0 || url.indexOf(".avif") >=0
    }

    const fetchEmbedMetas = async (url: string) => {
        const response = await fetch(`https://api.dub.sh/metatags?url=${url}`)
        
        if(response.ok){
            return response.json();
        }else{
            return url;
        }
    }
</script>

{#if block}
    {#if isImage(block.embed.url)}
        <img src={block.embed.url} alt={block.embed.caption?.join(" ")} />
    {:else}
        {#await fetchEmbedMetas(block.embed.url)}
            Generating Embed...
        {:then {title, description, image}} 
            <div class="flex flex-col overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                <img src={image} alt={description} class="h-[250px] w-full border-b border-gray-300 object-cover" />
                <div class="flex flex-col bg-slate-50 gap-1">
                    <b class="text-sm text-[#536471]">{title}</b>
                    <p class="line-clamp-2 text-sm text-[#536471]">{description}</p>
                </div>
            </div>
        {/await}
    {/if}
{/if}