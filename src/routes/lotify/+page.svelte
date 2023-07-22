<script>
	import Datagrid from '$lib/features/datagrid/Datagrid.svelte';
	import DatagridColumn from '$lib/features/datagrid/DatagridColumn.svelte';
	import BottomDrawer from '$lib/features/drawer/BottomDrawer.svelte';
	import Map from '$lib/features/map/Map.svelte';
	import Gps from '$lib/features/map/controls/Gps.svelte';
	import MapLayer from '$lib/features/map/layers/MapLayer.svelte';

	let data = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		note: 'A',
		distance: 10000
	}));

	setInterval(() => {
		data = data.map((d) => ({
			...d,
			distance: d.distance - 1
		}));
	}, 10000);

	console.log(data);
</script>

<svelte:head>
	<title>Lotify</title>
</svelte:head>
<Map>
	<MapLayer />
	<Gps />
</Map>
<BottomDrawer text="Notifiers">
	<Datagrid {data}>
		<DatagridColumn id="note" type="text" />
		<DatagridColumn id="distance" label="Distance (km)" type="number" />
	</Datagrid>
</BottomDrawer>
