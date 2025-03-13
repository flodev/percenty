<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Drawer from '$lib/components/ui/drawer';
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    title: string;
    onClose: () => void;
    children: Snippet;
    footer?: Snippet;
  };

  let { open, title, children, onClose, footer }: Props = $props();
</script>

<Drawer.Root bind:open {onClose}>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>{title}</Drawer.Title>
    </Drawer.Header>
    {@render children()}

    <Drawer.Footer>{@render footer?.()}</Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
