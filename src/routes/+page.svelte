<script lang="ts">
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import CategoryForm from './category/category-form.svelte';
  import { type CategorySchema, type CategoryType } from './schemas/schema';
  import Category from './category/category.svelte';
  import { Category as CategoryClass } from './schemas/category.svelte';
  import Drawer from './drawer/drawer.svelte';
  import AddMenu from './category/add-menu.svelte';
  import Amount from './amount.svelte';
  import { AmountSchema, type AmountFormData } from './amount-schema';
  import { toast } from 'svelte-sonner';
  import { copyText } from 'svelte-copy';
  import ConfirmCategoryDelete from './confirm-category-delete.svelte';

  let isDrawerOpen = $state(false);
  let parentCategory = $state<CategoryClass | undefined>();
  let isConfirmDeleteCategoryOpen = $state(false);
  let categoryForDelete = $state<CategoryClass | undefined>();

  let data = $state<CategoryClass>(new CategoryClass('root', 100, [], [], undefined, 1));

  let emptyForm: SuperValidated<Infer<CategorySchema>> = {
    data: {
      categories: [],
      name: '',
      amount: undefined,
      percentages: []
    },
    valid: true,
    posted: false,
    id: 'new',
    errors: {}
  };

  let amountForm: AmountFormData = $state({
    data: { amount: 1 },
    valid: true,
    posted: false,
    id: 'new',
    errors: {}
  });

  const onAmountFormSubmit = (amountData: number) => {
    amountForm.data.amount = amountData;
    data.amount = amountData;
  };
  function onCategoryAdd(parent: CategoryClass) {
    parentCategory = parent;
    isDrawerOpen = true;
  }

  function onConfirmDeleteCategory() {
    isConfirmDeleteCategoryOpen = false;
    if (categoryForDelete) {
      if (categoryForDelete.parent) {
        categoryForDelete.parent.categories = categoryForDelete.parent?.categories.filter(
          (parentCategory) => categoryForDelete !== parentCategory
        );
      }
    }
    categoryForDelete = undefined;
  }

  function onCategoryRemove(category: CategoryClass) {
    isConfirmDeleteCategoryOpen = true;
    categoryForDelete = category;
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

  async function onAmountClick(amount: number) {
    try {
      await copyText(amount.toString());
      toast.success('Copied to clipboard', { position: 'top-center', duration: 1000 });
    } catch (e) {
      toast.error('Copy did not work :/');
    }
  }

  function onCancelConfirmDelete() {
    isConfirmDeleteCategoryOpen = false;
    categoryForDelete = undefined;
  }
</script>

<div class="my-5 flex justify-end">
  <AddMenu onCategoryAdd={() => onCategoryAdd(data)} />
</div>
<div class="my-5">
  <Amount amount={amountForm.data.amount} onSubmit={onAmountFormSubmit} />
</div>
{#each data.categories as category}
  <Category {category} {onCategoryAdd} {onAmountClick} {onCategoryRemove} />
{/each}

<Drawer open={isDrawerOpen} title="New Category" onClose={() => (isDrawerOpen = false)}>
  <CategoryForm
    data={emptyForm}
    onSubmit={onCategorySubmit}
    maxPercent={parentCategory?.availablePercent ?? data.availablePercent}
  />
</Drawer>

{#if isConfirmDeleteCategoryOpen}
  <ConfirmCategoryDelete
    isOpen={isConfirmDeleteCategoryOpen}
    onConfirm={onConfirmDeleteCategory}
    onCancel={onCancelConfirmDelete}
  />
{/if}
