<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

  const { isOpen } = $props();
</script>

<AlertDialog.Root open={isOpen}>
  <!-- <AlertDialog.Trigger asChild let:builder> -->
  <!-- {@render triggerButton(builder)} -->
  <!-- <Button builders={[builder]} variant="outline">Show Dialog</Button> -->
  <!-- </AlertDialog.Trigger> -->
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
