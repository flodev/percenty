<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import CategoryComponentRecursive from './category.svelte';
  import type { Category } from '../schemas/category';
  import { Plus } from 'lucide-svelte';

  let { category }: { category: Category } = $props();

  import * as Popover from '$lib/components/ui/popover';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<Card.Root>
  <Card.Header class="flex flex-row items-center justify-between">
    <Card.Title>{category.name}</Card.Title>
    <Popover.Root portal={null}>
      <Popover.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" size="icon"><Plus /></Button>
      </Popover.Trigger>
      <Popover.Content class="flex flex-col">
        <Button variant="outline" class="flex justify-start"><Plus /> sub category</Button>
        <Button variant="outline" class="flex justify-start"><Plus /> percentage</Button>
      </Popover.Content>
    </Popover.Root>
  </Card.Header>
  <Card.Content>
    {#each category.categories as childCategory}
      <CategoryComponentRecursive category={childCategory} />
    {/each}
  </Card.Content>
</Card.Root>
