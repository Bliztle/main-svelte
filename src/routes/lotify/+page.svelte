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
			{ name: 'A', type: 'B', count: 1 },
			{ name: 'C', type: 'D', count: 2 },
			{ name: 'E', type: 'F', count: 3 }
		]}
	>
		<DatagridColumn id="name" label="Name" type="text" />
		<DatagridColumn id="type" label="Type" type="text" />
		<DatagridColumn id="count" type="number" />
	</Datagrid>
</BottomDrawer>
