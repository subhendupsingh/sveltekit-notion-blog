<script lang="ts">
	import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    export let block:  EmbedBlockObjectResponse;
    import { GenericEmbed } from 'sveltekit-embed'

   // $: if(block?.embed?.url) {fetchEmbedMetas(block?.embed?.url);}

    const isImage = (url: string) => {
        return url.indexOf(".jpg") >=0 || url.indexOf(".png") >=0 || url.indexOf(".jpeg") >=0 || url.indexOf(".webp") >=0 || url.indexOf(".avif") >=0
    }

    let title: string, description: string, image: string, isEmbedImage: boolean = false;

    const fetchEmbedMetas = async (url: string) => {
        isEmbedImage = isImage(url);
        console.log("url", url, "isEmbedImage",isEmbedImage);
        
        if(isEmbedImage){
            return url;
        }

        const response = await fetch(`https://api.dub.sh/metatags?url=${url}`, {
            mode: "no-cors",
            headers: {
                "content-type": "application/json"
            }
        })

        console.log("response", response);
        
        
        if(response.ok){
            const json = await response.json();
            console.log(json);
            
            title =  json?.title;
            description = json?.description,
            image = json?.image;
        }else{
            return url;
        }
    }
</script>

{#if block}
    {#if isImage(block.embed.url)}
        <img src={block.embed.url} alt={block.embed.caption?.join(" ")} />
    {:else}
        <a href={block.embed.url} target="_blank">
            <GenericEmbed src={block.embed.url} />
        </a>
    {/if}
{/if}