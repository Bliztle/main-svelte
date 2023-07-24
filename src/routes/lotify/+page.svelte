<script lang="ts">
	import { page } from '$app/stores';
	import Datagrid from '$lib/features/datagrid/Datagrid.svelte';
	import DatagridColumn from '$lib/features/datagrid/DatagridColumn.svelte';
	import { datagridStore } from '$lib/features/datagrid/datagridStore.js';
	import BottomDrawer from '$lib/features/drawer/BottomDrawer.svelte';
	import Map from '$lib/features/map/Map.svelte';
	import GpsControl from '$lib/features/map/controls/GpsControl.svelte';
	import MapLayer from '$lib/features/map/layers/MapLayer.svelte';
	import type Geolocation from 'ol/Geolocation';
	import LotifyControl from './LotifyControl.svelte';
	import { setLotifyContext } from './lotifyContext';
	import { distance } from 'ol/coordinate';

	export let data;

	const store = datagridStore(data.pointsData, $page.url.pathname);
	setLotifyContext({
		pointsDataStore: store
	});

	let geolocation: Geolocation | undefined = undefined;
	$: if (geolocation) {
		geolocation.on('change:position', (e) => {
			const coordinates = geolocation?.getPosition();
			store.update((s) => {
				return {
					...s,
					rows: s.rows.map((row) => {
						return {
							...row,
							distance: coordinates && distance(coordinates, row.coordinates)
						};
					})
				};
			});
		});
	}
</script>

<svelte:head>
	<title>Lotify</title>
</svelte:head>
<Map>
	<MapLayer />
	<GpsControl bind:geolocation />
	<LotifyControl />
</Map>
<BottomDrawer text="Notifiers">
	<Datagrid {store}>
		<DatagridColumn id="note" type="text" />
		<DatagridColumn id="distance" label="Distance" type="number" />
	</Datagrid>
</BottomDrawer>
