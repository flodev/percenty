<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { AmountSchema, type AmountFormData } from './amount-schema';
  import { Button } from '$lib/components/ui/button';
  import { Edit } from 'lucide-svelte';

  type Props = {
    data: AmountFormData;
    onSubmit(amount: AmountFormData): void;
  };

  let isWritable = $state(false);

  let amountElement: HTMLInputElement;

  const { data, onSubmit }: Props = $props();

  const form = superForm(data, {
    SPA: true,
    validators: zod(AmountSchema),
    onUpdate({ form }) {
      console.log('on update', form);
      if (form.valid) {
        onSubmit(form);
      }
    }
  });

  $effect(() => {
    if (isWritable && amountElement) {
      amountElement.focus();
    }
  });

  const { form: formData, enhance, submit } = form;

  $effect(() => {
    if (data) {
      $formData = { ...data, amount: data.data.amount };
    }
  });

  const onAmountFieldBlur = () => {
    submit();
    isWritable = false;
  };
</script>

{#if isWritable}
  <form method="POST" use:enhance class="pr-5 pl-5">
    <Form.Field {form} name="amount">
      <Form.Control let:attrs>
        <Form.Label>Amount</Form.Label>
        <Input
          {...attrs}
          bind:value={$formData.amount}
          type="number"
          bind:inputElement={amountElement}
          on:blur={onAmountFieldBlur}
        />
      </Form.Control>
      <Form.Description>The Sum that needs to split up</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
  </form>
{/if}

{#if !isWritable}
  <div class="flex-row items-center justify-start">
    Amount: {data.data.amount}
    <Button variant="outline" size="icon" on:click={() => (isWritable = true)}
      ><Edit class="align-middle" /></Button
    >
  </div>
{/if}
