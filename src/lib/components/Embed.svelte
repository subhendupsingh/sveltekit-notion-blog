<script lang="ts">
	import { onMount } from "svelte";
	import GenericEmbed from "./GenericEmbed.svelte";
	import ShootmailEmbed from "./ShootmailEmbed.svelte";
	import type { EmbedBlockObjectResponse } from "$lib/types";
    export let block:  EmbedBlockObjectResponse;

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

        const response = await fetch(`https://api.dub.sh/metatags?url=${url}`)

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

    onMount(async () => {
        if(block?.embed?.url) {
            fetchEmbedMetas(block?.embed?.url);
        }
    })
</script>

{#if block}
    {#if isImage(block.embed.url)}
        <img src={block.embed.url} alt={block.embed.caption?.join(" ")} />
    {:else}
        {#if block.embed.url.indexOf("shootmail.app")>-1}
            <ShootmailEmbed props={{ url: block.embed.url, title, description, image }} />
        {:else}
            <GenericEmbed props={{ url: block.embed.url, title, description, image }} />
        {/if}
    {/if}
{/if}