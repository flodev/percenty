<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Drawer from '$lib/components/ui/drawer';
  import type { Snippet } from 'svelte';

  type Props = {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    children: Snippet;
  };

  let { open, title, description, onClose }: Props = $props();
</script>

<Drawer.Root bind:open {onClose}>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>{title}</Drawer.Title>
      <Drawer.Description>{description}</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
