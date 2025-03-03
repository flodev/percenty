<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import CategoryForm from './category/category-form.svelte';
	import { categorySchema } from './schemas/schema';
	import { zod } from 'sveltekit-superforms/adapters';
	let { data } = $props();
</script>

<!-- <Card.Root>
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Card Description</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Card Content</p>
	</Card.Content>
	<Card.Footer>
		<p>Card Footer</p>
	</Card.Footer>
</Card.Root> -->

<CategoryForm data={data.form} />
