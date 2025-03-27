<script lang="ts">
  import '../app.css';
  let { children } = $props();
  import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />

<div class="m-5">
  {@render children()}
</div>

<style lang="postcss">
  @reference "tailwindcss/theme";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
