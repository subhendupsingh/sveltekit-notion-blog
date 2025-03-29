<script lang="ts">
	import PostItem from "./PostItem.svelte";
	import type { PageData } from "../../routes/$types";
	import ErrorPage from "./ErrorPage.svelte";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<MetaTags
  title= {data.seo?.siteName}
  titleTemplate={"%s | " + data.seo?.siteSlogan}
  description= {data.seo?.siteSlogan}
  openGraph={{
    url: (data?.seo?.siteUrl ?? "https://example.com"),
    title: `${data.seo?.siteName} | ${data.seo?.siteSlogan}`,
    description: data.seo?.siteSlogan,
    images: [
      { url: data.seo?.ogImage ?? "" }
    ],
    site_name: data.seo?.siteName ?? ""
  }}
  twitter={{
    handle: data.seo?.twitterHandle ?? '@subhendupsingh',
    site: data?.seo?.siteUrl ?? "https://example.com",
    cardType: 'summary_large_image',
    title: data.seo?.siteName + " Blog",
    description: data.seo?.siteSlogan,
    image: data.seo?.ogImage ,
  }}
  facebook={{
    appId: '1234567890'
  }}
/>

<JsonLd 
    schema={{
        "@context": "https://schema.org", 
        "@type": "WebSite",
        "headline": data.seo?.siteName + " Blog",
        "image": data.seo?.ogImage,
        "author": data.seo?.siteName, 
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
            "@id": data?.seo?.siteUrl ? data?.seo?.siteUrl+"/blog" : "https://example.com/blog"
        },
    }}
/> 

<!-- Post List -->
{#if data.pages}
    <div class="sk-blog-posts-list">
        <div class="sk-blog-posts-list-container">
            <div class="sk-blog-posts-list-header">
                {#if data.settings.blogTitle}
                    <h1 class="sk-blog-h1">{ data.settings.blogTitle }</h1>
                {/if}
        
                {#if data.settings.blogDescription}
                    <p class="sk-blog-body">
                        { data.settings.blogDescription }
                    </p>
                {/if}
            </div>

            <div class="sk-blog-posts-list-content">
                {#each data.pages as page}
                    <PostItem properties = { page.properties } cover = { page.cover } />
                {/each}
            </div>
        </div>
    </div>
{/if}

<ErrorPage {data} />