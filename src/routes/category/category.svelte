<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import CategoryComponentRecursive from './category.svelte';
  import type { Category } from '../schemas/category.svelte';
  import AddMenu from './add-menu.svelte';

  let {
    category,
    onCategoryAdd
  }: {
    category: Category;
    onCategoryAdd: (parent: Category) => void;
  } = $props();
</script>

<Card.Root>
  <Card.Header class="flex flex-row items-center justify-between">
    <Card.Title
      ><span class="text-2xl text-blue-600">{category.percent}%</span> {category.name}</Card.Title
    >
    <AddMenu onCategoryAdd={() => onCategoryAdd(category)} onPercentageAdd={console.log} />
  </Card.Header>
  <Card.Content>
    {#each category.categories as childCategory}
      <CategoryComponentRecursive category={childCategory} {onCategoryAdd} />
    {/each}
  </Card.Content>
</Card.Root>
