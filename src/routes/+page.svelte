<script lang="ts">
    import PostsList from '$lib/components/PostsList.svelte';
    let { data } = $props();
</script>

<PostsList {data} />