<script>
	import { navigating } from '$app/stores';
	import FlexColumn from '$lib/features/layout/FlexColumn.svelte';
	import LoadingSpinner from '$lib/features/layout/LoadingSpinner.svelte';
	import NavBar from '$lib/features/navigation/NavBar.svelte';
	import CssImport from './CssImport.svelte';
	// import '../app.css';
</script>

<CssImport />
<div class="h-screen w-screen">
	<FlexColumn>
		<NavBar slot="header" />
		{#if $navigating}
			<LoadingSpinner />
		{:else}
			<slot />
		{/if}
	</FlexColumn>
</div>
