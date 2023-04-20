<script lang="ts">
	import type { Cover, Properties } from "$lib/types";
    import { Image } from "@unpic/svelte";
    export let properties: Properties;
    export let cover: Cover;
</script>

<article class="mb-16">
    <a data-sveltekit-preload-data href={`/blog/${properties?.Slug?.rich_text?.[0]?.plain_text}`} class="flex flex-col">
        <Image
            src= { cover?.external?.url ?? "https://picsum.photos/id/300/500?blur=9&random=2" }
            layout="fullWidth"
            alt="A lovely bath"
            class="rounded-md object-cover aspect-video"
        />

        <div>
            <h1 class="font-bold text-2xl text-gray-800 mt-4">{properties.Title.title[0].text.content}</h1>
            <p class="line-clamp-2 text-gray-700">{properties["Short Description"]?.rich_text?.[0]?.plain_text}</p>
        </div>
    </a>
</article>