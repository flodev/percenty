<script lang="ts">
  type Props = {
    open: boolean;
    title: string;
    description: string;
  };

  import { Button } from '$lib/components/ui/button';
  import * as Drawer from '$lib/components/ui/drawer';

  let { open, title, description }: Props = $props();
</script>

<Drawer.Root bind:open>
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
