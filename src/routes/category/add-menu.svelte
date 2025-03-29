<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Popover from '$lib/components/ui/popover';
  import { EllipsisVertical, Plus, Trash } from 'lucide-svelte';

  type Props = {
    onCategoryAdd: () => void;
    onCategoryRemove?: () => void;
  };

  const { onCategoryAdd, onCategoryRemove }: Props = $props();

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
    <Button variant="outline" size="icon"><EllipsisVertical /></Button>
  </Popover.Trigger>
  <Popover.Content class="flex flex-col">
    <Button
      variant="outline"
      class="justify-start gap-2"
      on:click={() => onMenuClick(onCategoryAdd)}
      ><Plus /> Add category
    </Button>
    {#if onCategoryRemove}
      <Button
        variant="outline"
        class="justify-start gap-2"
        on:click={() => onMenuClick(onCategoryRemove)}><Trash /> Remove Category</Button
      >
    {/if}
  </Popover.Content>
</Popover.Root>
