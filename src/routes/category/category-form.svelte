<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { categorySchema, type CategorySchema, type CategoryType } from '../schemas/schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zod, zodClient } from 'sveltekit-superforms/adapters';

  type Props = {
    data: SuperValidated<Infer<CategorySchema>>;
    onSubmit(category: CategoryType): void;
  };
  const { data, onSubmit }: Props = $props();

  const form = superForm(data, {
    SPA: true,
    validators: zod(categorySchema),
    onUpdate({ form }) {
      console.log('on update', form);
      if (form.valid) {
        onSubmit(form.data);
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="pr-5 pl-5">
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.Description>Category name</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="percent">
    <Form.Control let:attrs>
      <Form.Label>Percent</Form.Label>
      <Input {...attrs} bind:value={$formData.percent} type="number" />
    </Form.Control>
    <Form.Description>Percent to give the category</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Save</Form.Button>
</form>
