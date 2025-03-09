<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import CategoryForm from './category/category-form.svelte';
  import { categorySchema } from './schemas/schema';
  import { zod } from 'sveltekit-superforms/adapters';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category';
  let { data } = $props();

  const onCategoryAdd = () => {
    console.log('hallo');
  };
</script>

<Category category={new CategoryClass('test', 100, [], [], undefined)} {onCategoryAdd} />

<!-- <CategoryForm data={data.form} /> -->
