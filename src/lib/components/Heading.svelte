<script lang="ts">
	import type { Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse, TextRichTextItemResponse } from "$lib/types";
	import { processAnnotations } from "$lib/types/helpers";


    interface Props {
        heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse;
    }

    let { heading }: Props = $props();

    //method to slugify
    function slugify(text: string) {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    function getHeadingText(heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse) {
        if(!heading) return
        let richText: TextRichTextItemResponse[] = heading.type === "heading_1" ? heading.heading_1?.rich_text : heading.type === "heading_2" ? heading.heading_2?.rich_text : heading.heading_3?.rich_text;
        /* switch(heading.type){
            case "heading_1":
                return heading.heading_1?.rich_text?.map((t)=> t.plain_text)?.join(" ")
            case "heading_2":
                return heading.heading_2?.rich_text?.map((t)=> t.plain_text)?.join(" ")
            case "heading_3":
                return heading.heading_3?.rich_text?.map((t)=> t.plain_text)?.join(" ")
        } */
       let headingText = richText?.map((t)=> t.plain_text)?.join(" ");
       let headingTextWithAnnotations = "";
       for (let index = 0; index < richText.length; index++) {
        const rt = richText[index];
        const styles = processAnnotations(rt.annotations);
        if(rt.text.link) {
            headingTextWithAnnotations += `<a href="${rt.text.link.url}" class="!text-orange-500 underline underline-offset-2" style="${styles}" target="_blank" rel="noopener noreferrer">${rt.plain_text}</a>`;
        }else{
            headingTextWithAnnotations += `<span style="${styles}">${rt.plain_text}</span>`;
        }
       }
       return {
           headingText,
           headingTextWithAnnotations
       }
    }

    function slugIt(heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse) {
        const text = getHeadingText(heading);
        if(!text) return;
        return slugify(text.headingText);
    }
</script>

{#if heading}
    {#if heading.type=="heading_1"}
        <h1 class="sk-blog-h1" id={slugIt(heading)}>{@html getHeadingText(heading)?.headingTextWithAnnotations}</h1>
    {:else if heading.type=="heading_2"}
        <h2 class="sk-blog-h2" id={slugIt(heading)}>{@html getHeadingText(heading)?.headingTextWithAnnotations}</h2>
    {:else if heading.type=="heading_3"}
        <h3 class="sk-blog-h3" id={slugIt(heading)}>{@html getHeadingText(heading)?.headingTextWithAnnotations}</h3>
    {/if}
{/if}
