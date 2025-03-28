<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	let { data } = $props();
</script>

<BlogPost {data} />

