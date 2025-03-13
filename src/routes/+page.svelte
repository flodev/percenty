<script lang="ts">
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import CategoryForm from './category/category-form.svelte';
  import { categorySchema, type CategorySchema, type CategoryType } from './schemas/schema';
  import { zod } from 'sveltekit-superforms/adapters';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category';
  import Drawer from './drawer/drawer.svelte';
  import { Button } from '$lib/components/ui/button';

  let { data } = $props();
  let isDrawerOpen = $state(false);
  let parentCategory = $state<CategoryClass | undefined>();

  let emptyForm: SuperValidated<Infer<CategorySchema>> = {
    data: {
      categories: [],
      name: '',
      percent: 0,
      percentages: []
    },
    valid: true,
    posted: false,
    id: 'new',
    errors: {}
  };
  const onCategoryAdd = (parent: CategoryClass) => {
    parentCategory = parent;
    isDrawerOpen = true;
  };

  const onCategorySubmit = (data: CategoryType) => {
    if (!parentCategory) {
      throw new Error('parent category not set, cannot save');
    }
    isDrawerOpen = false;
    parentCategory.categories.push(
      new CategoryClass(data.name, data.percent, [], [], parentCategory)
    );
  };
</script>

<Category category={new CategoryClass('test', 100, [], [], undefined)} {onCategoryAdd} />

<Drawer open={isDrawerOpen} title="New Category" onClose={() => (isDrawerOpen = false)}>
  <CategoryForm data={emptyForm} onSubmit={onCategorySubmit} />
</Drawer>
