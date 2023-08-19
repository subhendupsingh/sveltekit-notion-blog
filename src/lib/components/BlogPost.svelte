<script lang="ts">
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import ErrorPage from "./ErrorPage.svelte";
	import Post from "./Post.svelte";
	import type { TableOfContentItems } from "$lib/types";
	import type { PageData } from "../../routes/blog/[slug]/$types";

    export let data: PageData;

    let tableOfContent: (TableOfContentItems | undefined)[] | undefined;

    $: tableOfContent = data?.blocks?.map((block)=>{
        if(block.type==="heading_1"){
            return {
                type: block.type,
                text: block.heading_1?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else if(block.type==="heading_2"){
            return {
                type: block.type,
                text: block.heading_2?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else if(block.type==="heading_3"){
            return {
                type: block.type,
                text: block.heading_3?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else{
            return undefined;
        }
    });
</script>

<MetaTags
  title= {data.title}
  titleTemplate="%s | StoreBud- Launch ecommerce website in india and the world"
  description= {data.description}
  openGraph={{
    url: "https://mystorebud.com/blog/" + data.slug,
    title:data.title,
    description: data.description,
    images: [
      { url: data.cover ?? "" }
    ],
    site_name: 'StoreBud'
  }}
  twitter={{
    handle: '@mystorebud',
    site: '@mystorebud',
    cardType: 'summary_large_image',
    title: data.title,
    description: data.description,
    image: data.cover ,
    imageAlt: data.title
  }}
  facebook={{
    appId: '1234567890'
  }}
/>

<JsonLd 
    schema={{
        "@context": "https://schema.org", 
        "@type": "BlogPosting",
        "headline": data.title,
        "image": data.cover,
        "author": data.author?.name ?? "Team StoreBud", 
        "publisher": {
            "@type": "Organization",
            "name": "StoreBud",
            "logo": {
            "@type": "ImageObject",
            "url": "https://www.mystorebud.com/android-chrome-192x192.png"
            }
        },
        "url": "http://www.mystorebud.com",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://mystorebud.com/blog"
        },
        "description": data.description,
        "articleBody": data.description,
        "dateCreated": data?.published ? new Date(data?.published).toISOString() : new Date().toISOString(),
        "datePublished": data?.published ? new Date(data.published).toISOString() : new Date().toISOString(),
    }}
/> 

<ErrorPage {data} />

<div class="min-h-screen bg-white py-8 flex flex-col justify-center relative overflow-hidden lg:py-12">
    <div class="relative w-full px-6 py-12 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <Post blocks={data.blocks} {tableOfContent} title={data.title} cover={data.cover} faqs={data.faqs} author={data.author} published={data.published} />
    </div>
</div>