<script>
	import Map from '$lib/features/map/Map.svelte';
	import Gps from '$lib/features/map/controls/Gps.svelte';
	import MapLayer from '$lib/features/map/layers/MapLayer.svelte';
</script>

<svelte:head>
	<title>Lotify</title>
</svelte:head>
<Map>
	<MapLayer />

	<Gps />
</Map>
