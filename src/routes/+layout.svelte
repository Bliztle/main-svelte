<script>
	import { navigating } from '$app/stores';
	import FlexColumn from '$lib/features/layout/FlexColumn.svelte';
	import LoadingSpinner from '$lib/features/layout/LoadingSpinner.svelte';
	import NavBar from '$lib/features/navigation/NavBar.svelte';
	import '../app.css';
</script>

<FlexColumn>
	<NavBar slot="header" />
	{#if $navigating}
		<LoadingSpinner />
	{:else}
		<slot />
	{/if}
</FlexColumn>
