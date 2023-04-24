<script lang="ts">
	import PostItem from "./PostItem.svelte";
	import type { PageData } from "../../routes/$types";
	import ErrorPage from "./ErrorPage.svelte";
    export let data: PageData;
</script>

{#if data.pages}
    <div class="min-h-screen bg-white py-8 flex flex-col gap-20 relative overflow-hidden lg:py-8">
        <div class="relative w-full px-6 py-12 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-12 lg:pb-28">
            <div class="flex flex-col gap-12 mb-8">
                <h1 class="font-bold text-4xl">Welcome to StoreBud blog - Platform for growing D2C brands!</h1>
           
                <p class="text-lg">
                    StoreBud blogs cover variuos topics related to setting up your own ecommerce website in India and 
                    other parts of the world, including tips and tricks, best practices and success stroies of the 
                    growing D2C brands.
                </p>
            </div>

            {#each data.pages as page}
                <PostItem properties = { page.properties } cover = { page.cover } />
            {/each}
        </div>
    </div>
{/if}

<ErrorPage {data} />