<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

  const { isOpen, onConfirm, onCancel } = $props();
</script>

<AlertDialog.Root open={isOpen} onOpenChange={(state) => (state === false ? onCancel() : '')}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete the category and all sub
        cateogries.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action on:click={onConfirm}>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
