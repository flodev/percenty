<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import CategoryComponentRecursive from './category.svelte';
  import type { Category } from '../schemas/category';
  import { Plus } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import Button from '$lib/components/ui/button/button.svelte';

  let {
    category,
    onCategoryAdd
  }: { category: Category; onCategoryAdd: (parent: Category) => void } = $props();
  let isAddMenuOpen = $state(false);

  const onCategoryAddClick = () => {
    isAddMenuOpen = false;
    onCategoryAdd(category);
  };
</script>

<Card.Root>
  <Card.Header class="flex flex-row items-center justify-between">
    <Card.Title>{category.name} {isAddMenuOpen}</Card.Title>
    <Button variant="outline" size="icon" on:click={() => (isAddMenuOpen = true)}><Plus /></Button>
    <Popover.Root portal={null} open={isAddMenuOpen}>
      <Popover.Trigger></Popover.Trigger>
      <Popover.Content class="flex flex-col">
        <Button variant="outline" class="flex justify-start" on:click={onCategoryAddClick}
          ><Plus /> sub category
        </Button>
        <Button variant="outline" class="flex justify-start"><Plus /> percentage</Button>
      </Popover.Content>
    </Popover.Root>
  </Card.Header>
  <Card.Content>
    {#each category.categories as childCategory}
      <CategoryComponentRecursive category={childCategory} onCategoryAdd={onCategoryAddClick} />
    {/each}
  </Card.Content>
</Card.Root>
