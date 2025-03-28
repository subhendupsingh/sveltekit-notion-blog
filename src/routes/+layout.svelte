<script lang="ts">
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ModeWatcher defaultMode="system" />

{@render children?.()}
