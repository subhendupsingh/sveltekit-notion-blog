<script lang="ts">
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import ErrorPage from "./ErrorPage.svelte";
	import Post from "./Post.svelte";
	import type { TableOfContentItems } from "$lib/types";
	import type { PageData } from "../../routes/blog/[slug]/$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
    let tableOfContent: (TableOfContentItems | undefined)[] | undefined = $derived(data?.blocks?.map((block)=>{
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
    }));

    
</script>

<MetaTags
  title= {data.title}
  titleTemplate={"%s | " + data.seo?.siteSlogan}
  description= {data.description}
  openGraph={{
    url: (data?.seo?.siteUrl ?? "https://example.com") + "/blog/" +data.slug,
    title:data.title,
    description: data.description,
    images: [
      { url: data.cover ?? "" }
    ],
    site_name: data.seo?.siteName ?? ""
  }}
  twitter={{
    handle: data.seo?.twitterHandle ?? '@subhendupsingh',
    site: data?.seo?.siteUrl ?? "https://example.com",
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
            "name": data.seo?.siteName ?? "",
            "logo": {
                "@type": "ImageObject",
                "url": data?.seo?.logo ?? "https://example.com/logo.png"
            }
        },
        "url": data?.seo?.siteUrl ?? "https://example.com",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data?.seo?.siteUrl+"/blog" ?? "https://example.com/blog"
        },
        "description": data.description,
        "articleBody": data.description,
        "dateCreated": data?.published ? new Date(data?.published).toISOString() : new Date().toISOString(),
        "datePublished": data?.published ? new Date(data.published).toISOString() : new Date().toISOString(),
    }}
/> 

<ErrorPage {data} />

<div class="sk-blog-blog-post-parent">
    <div class="sk-blog-blog-post-container">
        <Post 
            blocks={data.blocks} 
            {tableOfContent} 
            title={data.title} 
            cover={data.cover} 
            faqs={data.faqs} 
            author={data.author} 
            published={data.published} 
        />
    </div>
</div>