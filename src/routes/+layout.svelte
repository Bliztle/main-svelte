<script>
	import NavBar from '$lib/features/navigation/NavBar.svelte';
	import '../app.css';
</script>

<div class="h-screen w-screen flex flex-col">
	<div class="flex-none">
		<NavBar />
	</div>
	<div class="flex-1">
		<slot />
	</div>
</div>
