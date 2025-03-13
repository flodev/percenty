<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import CategoryComponentRecursive from './category.svelte';
  import type { Category } from '../schemas/category';
  import { Plus } from 'lucide-svelte';
  import { Popover } from 'bits-ui';
  import Button from '$lib/components/ui/button/button.svelte';

  let {
    category,
    onCategoryAdd
  }: { category: Category; onCategoryAdd: (parent: Category) => void } = $props();
  let isAddMenuOpen = $state(false);

  const onCategoryAddClick = () => {
    console.log('huhu??');
    isAddMenuOpen = false;
    onCategoryAdd(category);
  };

  const onOpenChange = (isOpen: boolean) => {
    console.log('onOpenChange', isOpen);
    isAddMenuOpen = isOpen;
  };
</script>

<Card.Root>
  <Card.Header class="flex flex-row items-center justify-between">
    <Card.Title>{category.name}</Card.Title>
    <Popover.Root open={isAddMenuOpen} {onOpenChange}>
      <Popover.Trigger>
        <Button variant="outline" size="icon"><Plus /></Button>
      </Popover.Trigger>
      <Popover.Content class="flex flex-col">
        <Button variant="outline" class="flex justify-start" on:click={onCategoryAddClick}
          ><Plus /> sub category
        </Button>
        <Button variant="outline" class="flex justify-start" on:click={console.log}
          ><Plus /> percentage</Button
        >
      </Popover.Content>
    </Popover.Root>
  </Card.Header>
  <Card.Content>
    {#each category.categories as childCategory}
      <CategoryComponentRecursive category={childCategory} onCategoryAdd={onCategoryAddClick} />
    {/each}
  </Card.Content>
</Card.Root>
