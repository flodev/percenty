<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import CategoryComponentRecursive from './category.svelte';
  import type { Category } from '../schemas/category.svelte';
  import AddMenu from './add-menu.svelte';
  import { Button } from '$lib/components/ui/button';

  let {
    category,
    onCategoryAdd,
    onAmountClick,
    onCategoryRemove
  }: {
    onAmountClick?: (amount: number) => void;
    category: Category;
    onCategoryAdd: (parent: Category) => void;
    onCategoryRemove: (category: Category) => void;
  } = $props();
</script>

<Card.Root>
  <Card.Header class="flex flex-row items-center justify-between">
    <Card.Title class="flex items-center gap-5">
      {category.name}
    </Card.Title>
    <AddMenu
      onCategoryAdd={() => onCategoryAdd(category)}
      onCategoryRemove={() => onCategoryRemove(category)}
    />
  </Card.Header>
  <Card.Content>
    <span class="text-2xl text-blue-600">{category.percent}%</span>
    <Button on:click={() => onAmountClick?.(category.amount)}>{category.amount}</Button>
    {#each category.categories as childCategory}
      <div class="mt-5">
        <CategoryComponentRecursive
          category={childCategory}
          {onCategoryAdd}
          onCategoryRemove={() => onCategoryRemove(childCategory)}
          {onAmountClick}
        />
      </div>
    {/each}
  </Card.Content>
</Card.Root>
