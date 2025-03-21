<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input, type InputEvents } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zod, zodClient } from 'sveltekit-superforms/adapters';
  import * as z from 'zod';
  import { AmountSchema } from './amount-schema';
  import { Button } from '$lib/components/ui/button';
  import { Edit } from 'lucide-svelte';
  import type { SvelteComponent } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = {
    data: SuperValidated<Infer<typeof AmountSchema>>;
    onSubmit(category: z.infer<typeof AmountSchema>): void;
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
        onSubmit(form.data);
      }
    },
    // onChange: console.log,
    onResult: console.log,
    onUpdated: console.log,
    onSubmit: console.log
  });

  $effect(() => {
    console.log('isWritable', isWritable);
    console.log('amountElement', amountElement);
  });

  const { form: formData, enhance, submit } = form;
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
        />
      </Form.Control>
      <Form.Description>The Sum that needs to split up</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
  </form>
{/if}

{#if !isWritable}
  <div class="flex-row items-center justify-start">
    Amount: {$formData.amount}
    <Button variant="outline" size="icon" on:click={() => (isWritable = true)}
      ><Edit class="align-middle" /></Button
    >
  </div>
{/if}
