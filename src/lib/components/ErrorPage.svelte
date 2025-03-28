<script lang="ts">
    interface Props {
        data: any;
    }

    let { data }: Props = $props();
</script>

{#if data?.error}
    <div class="flex min-h-screen min-w-full justify-center items-center">
        <div class="bg-slate-200 p-10 rounded-md text-gray-700 flex flex-col gap-4">
            <h3 class="font-bold text-2xl text-gray-700">Error code: {data.error.code}</h3>
            <p class="text-lg text-gray-600">{JSON.stringify(data.error.message, null, 2)}</p>
        </div>
    </div>
{/if}