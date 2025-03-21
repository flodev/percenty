<script lang="ts">
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import CategoryForm from './category/category-form.svelte';
  import { type CategorySchema, type CategoryType } from './schemas/schema';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category.svelte';
  import Drawer from './drawer/drawer.svelte';
  import AddMenu from './category/add-menu.svelte';
  let isDrawerOpen = $state(false);
  let parentCategory = $state<CategoryClass | undefined>();

  let data = $state<{ categories: CategoryClass[] }>({ categories: [] });

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
  function onCategoryAdd(parent?: CategoryClass) {
    parentCategory = parent;
    isDrawerOpen = true;
  }

  function onCategorySubmit(formData: CategoryType) {
    const newCategory = new CategoryClass(formData.name, formData.percent, [], [], parentCategory);

    if (parentCategory) {
      parentCategory.categories.push(newCategory);
    } else {
      data.categories.push(newCategory);
    }
    parentCategory = undefined;
    isDrawerOpen = false;
  }
</script>

<div class="flex justify-end">
  <AddMenu {onCategoryAdd} onPercentageAdd={console.log} />
</div>
{#each data.categories as category}
  <Category {category} {onCategoryAdd} />
{/each}

<Drawer open={isDrawerOpen} title="New Category" onClose={() => (isDrawerOpen = false)}>
  <CategoryForm data={emptyForm} onSubmit={onCategorySubmit} />
</Drawer>
