<script lang='ts'>
    interface Props {
        props: {
            url: string | undefined;
            image: string | undefined;
            title: string | undefined;
            description: string | undefined;
        }
    }

    let { props }: Props = $props();
</script>

<a href={props.url} target="_blank">
    <div class="flex flex-col gap-4">
        {#if props.image}
            <img src="{props.image}" alt="" class="object-cover aspect-video">
        {/if}

        <div class="space-y-1">
            {#if props.title}
                <p class="text-sm text-gray-800 dark:text-gray-100">{props.title}</p>
            {/if}

            {#if props.description}
                <p class="text-sm text-gray-500 line-clamp-1">{props.description}</p>
            {/if}
        </div>
    </div>
</a>