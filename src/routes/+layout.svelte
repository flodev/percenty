<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss/theme";
	:global(html) {
		background-color: theme(--color-gray-100);
	}
</style>
