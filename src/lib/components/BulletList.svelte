<script lang="ts">
	import type { BulletedListItemBlockObjectResponse } from "$lib/types";
	import { processAnnotations } from "$lib/types/helpers";
    export let block: BulletedListItemBlockObjectResponse;
    let finalText = "";
    
    for (let index = 0; index < block.bulleted_list_item?.rich_text?.length; index++) {
        const rt = block.bulleted_list_item?.rich_text[index];
        const annotations = rt.annotations;
        let styles = processAnnotations(annotations);
        if(rt.text.link){
            finalText += `<a href="${rt.text.link.url}" style="${styles}" target="_blank" rel="noopener noreferrer">${rt.text.content}</a>`;
        }else{
            finalText += `<span style="${styles}">${rt.text.content}</span>`;
        }
    }
</script>

{#if block && block.bulleted_list_item?.rich_text.length > 0}
    <ul class="list-disc list-inside">    
        <!-- {#each  block.bulleted_list_item.rich_text as text } -->
            <li class="list-item sk-blog-body">
                {@html finalText}
            </li>    
        <!-- {/each} -->
    </ul>
{/if}