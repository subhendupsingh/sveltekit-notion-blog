<script lang="ts">
	import type { Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse;

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
        switch(heading.type){
            case "heading_1":
                return heading.heading_1?.rich_text?.map((t)=> t.plain_text)?.join(" ")
            case "heading_2":
                return heading.heading_2?.rich_text?.map((t)=> t.plain_text)?.join(" ")
            case "heading_3":
                return heading.heading_3?.rich_text?.map((t)=> t.plain_text)?.join(" ")
        }
    }

    function slugIt(heading: Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse) {
        const headingText = getHeadingText(heading);
        if(!headingText) return;
        return slugify(headingText);
    }
</script>

{#if heading}
    {#if heading.type=="heading_1"}
        <h1 class="sk-blog-h1" id={slugIt(heading)}>{getHeadingText(heading)}</h1>
    {:else if heading.type=="heading_2"}
        <h2 class="sk-blog-h2" id={slugIt(heading)}>{getHeadingText(heading)}</h2>
    {:else if heading.type=="heading_3"}
        <h3 class="sk-blog-h3" id={slugIt(heading)}>{getHeadingText(heading)}</h3>
    {/if}
{/if}
