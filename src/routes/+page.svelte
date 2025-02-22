<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types.js';

	import SettingsForm from './settings/settings-form.svelte';
	export let data: PageData;
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

<SettingsForm data={data.form} />
