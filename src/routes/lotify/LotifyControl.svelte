<script lang="ts">
	import VectorSource from 'ol/source/Vector';
	import { Vector as VectorLayer } from 'ol/layer';
	import { onDestroy } from 'svelte';
	import Control from 'ol/control/Control';
	import { IconBellPlus } from '@tabler/icons-svelte';
	import { getMapContext } from '$lib/features/map/mapContext';
	import Draw from 'ol/interaction/Draw';
	import { yellowCircle } from '$lib/features/map/styles/circles';
	import { bellIcon } from '$lib/features/map/styles/icons';
	import { getLotifyContext } from './lotifyContext';
	import { page } from '$app/stores';
	import { Point } from 'ol/geom';
	import Feature from 'ol/Feature';

	const mapContext = getMapContext();
	const lotifyContext = getLotifyContext();
	const lotifyPointsDataStore = lotifyContext.pointsDataStore;
	const controlContainers = mapContext.controlContainers;
	const map = mapContext.map;

	const pointStyle = [yellowCircle, bellIcon];
	const source = new VectorSource();
	const layer = new VectorLayer({
		map: $map,
		source,
		zIndex: 1
	});

	let control: Control;
	let draw = new Draw({
		source,
		type: 'Point'
	});

	// Keep map features updated
	$: {
		source.clear();
		source.addFeatures(
			$lotifyPointsDataStore.rows.map((row) => {
				const feature = new Feature({
					geometry: new Point(row.coordinates)
				});
				feature.setStyle(pointStyle);

				return feature;
			})
		);
	}

	const onControlClick = () => {
		$map.addInteraction(draw);

		draw.once('drawend', async (e) => {
			$map.removeInteraction(draw);
			e.feature.setStyle(pointStyle);

			const coordinates = (e.feature.getGeometry() as Point).getCoordinates();

			console.log(coordinates);

			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: JSON.stringify({
					note: 'New notifier from map',
					distance: 4,
					coordinates
				})
			});

			const pointData = await response.json();

			lotifyPointsDataStore.addRow({
				...pointData,
				distance: 4
			});
		});
	};

	const createControl = (element: HTMLButtonElement) => {
		control = new Control({
			element,
			target: $controlContainers.right
		});
		$map.addControl(control);
	};

	onDestroy(() => {
		$map.removeLayer(layer);
		$map.removeControl(control);
	});
</script>

<button
	use:createControl
	on:click={onControlClick}
	class="h-12 w-12 bg-slate-300 shadow hover:shadow-lg rounded-full place-items-center grid"
>
	<IconBellPlus />
</button>
