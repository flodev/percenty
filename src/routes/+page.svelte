<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import CategoryForm from './category/category-form.svelte';
  import { categorySchema } from './schemas/schema';
  import { zod } from 'sveltekit-superforms/adapters';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category';
  import Drawer from './drawer/drawer.svelte';

  let { data } = $props();
  let isDrawerOpen = $state(false);

  const onCategoryAdd = () => {
    isDrawerOpen = true;
  };
</script>

<Category category={new CategoryClass('test', 100, [], [], undefined)} {onCategoryAdd} />

<Drawer
  open={isDrawerOpen}
  description={'descr'}
  title="title"
  onClose={() => (isDrawerOpen = false)}
/>

<!-- <CategoryForm data={data.form} /> -->
