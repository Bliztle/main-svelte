<script>
	import Datagrid from '$lib/features/datagrid/Datagrid.svelte';
	import DatagridColumn from '$lib/features/datagrid/DatagridColumn.svelte';
	import BottomDrawer from '$lib/features/drawer/BottomDrawer.svelte';
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
<BottomDrawer text="Notifiers">
	<Datagrid
		data={[
			{ note: 'A', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'C', distance: 438 },
			{ note: 'E', distance: 438 }
		]}
	>
		<DatagridColumn id="note" type="text" />
		<DatagridColumn id="distance" label="Distance (km)" type="number" />
	</Datagrid>
</BottomDrawer>
