<script lang="ts">
	import type { FAQ } from "$lib/types";
	import { onMount } from "svelte";
	import { JsonLd } from "svelte-meta-tags";

    export let faqs: FAQ[] = [];
    $: count = faqs.length;
    $: (faqs?.shift());
    let loading = false;
    
    /* onMount(async()=>{
        loading = true;
        const response = await fetch("/api/blocks");
        loading = false;

        if(response.ok){
            const json = await response.json();
            faqs = json.faqs;
            //skipping the first row as it is header
            faqs.shift();
            count = faqs.length;
        }else{
            const text = await response.text();
        }
    }); */
</script>

<JsonLd
    schema={{
        "@context" : "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => {
            return {
                "@type": "Question",
                "name": faq.question ?? "",
                acceptedAnswer: [{
                    "@type": "Answer",
                    "text": faq.answer ?? ""
                }]
            }
        })
    }}
/>

{#if faqs && count > 0}
    {#if loading} Loading...{/if}
    {#each faqs as faq}
        <h3>{faq.question}</h3>
        <p>{faq.answer}</p>
    {/each}
{/if}