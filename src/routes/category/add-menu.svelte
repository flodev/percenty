<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Popover from '$lib/components/ui/popover';
  import { Plus } from 'lucide-svelte';

  type Props = {
    onCategoryAdd: () => void;
    onPercentageAdd: () => void;
  };

  const { onCategoryAdd, onPercentageAdd }: Props = $props();

  let isAddMenuOpen = $state(false);

  const onOpenChange = (isOpen: boolean) => {
    console.log('onOpenChange', isOpen);
    isAddMenuOpen = isOpen;
  };

  const onMenuClick = (callback: () => void) => {
    isAddMenuOpen = false;
    callback();
  };
</script>

<Popover.Root open={isAddMenuOpen} {onOpenChange}>
  <Popover.Trigger>
    <Button variant="outline" size="icon"><Plus /></Button>
  </Popover.Trigger>
  <Popover.Content class="flex flex-col">
    <Button variant="outline" class="flex justify-start" on:click={() => onMenuClick(onCategoryAdd)}
      ><Plus /> sub category
    </Button>
    <Button
      variant="outline"
      class="flex justify-start"
      on:click={() => onMenuClick(onPercentageAdd)}><Plus /> percentage</Button
    >
  </Popover.Content>
</Popover.Root>
