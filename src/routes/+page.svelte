<script lang="ts">
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { writable } from 'svelte/store';
  import CategoryForm from './category/category-form.svelte';
  import { categorySchema, type CategorySchema, type CategoryType } from './schemas/schema';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category';
  import Drawer from './drawer/drawer.svelte';
  import AddMenu from './category/add-menu.svelte';
  // let { data } = $props();
  let isDrawerOpen = $state(false);
  let parentCategory = $state<CategoryClass | undefined>();
  // let data = $state<CategoryClass | undefined>();

  const data = writable<{ rootCategories: CategoryClass[] }>({ rootCategories: [] });

  let emptyForm: SuperValidated<Infer<CategorySchema>> = {
    data: {
      categories: [],
      name: '',
      percent: 50,
      percentages: []
    },
    valid: true,
    posted: false,
    id: 'new',
    errors: {}
  };
  const onCategoryAdd = (parent?: CategoryClass) => {
    parentCategory = parent;
    isDrawerOpen = true;
  };

  const onCategorySubmit = (formData: CategoryType) => {
    isDrawerOpen = false;
    const newCategory = new CategoryClass(formData.name, formData.percent, [], [], parentCategory);

    data.update((currentState) => {
      if (parentCategory) {
        parentCategory.categories = [...parentCategory.categories, newCategory];
      } else {
        currentState.rootCategories = [...currentState.rootCategories, newCategory];
      }
      return { ...currentState };
    });
  };
</script>

<div class="flex justify-end">
  <AddMenu {onCategoryAdd} onPercentageAdd={console.log} />
</div>
{#each $data.rootCategories as category}
  <Category {category} {onCategoryAdd} />
{/each}

<Drawer open={isDrawerOpen} title="New Category" onClose={() => (isDrawerOpen = false)}>
  <CategoryForm data={emptyForm} onSubmit={onCategorySubmit} />
</Drawer>
