<script lang="ts">
	import { getMapContext } from '../mapContext';
	import Geolocation, { type GeolocationError } from 'ol/Geolocation';
	import VectorSource from 'ol/source/Vector';
	import { Vector as VectorLayer } from 'ol/layer';
	import { onDestroy } from 'svelte';
	import Control from 'ol/control/Control';
	import { IconCurrentLocation } from '@tabler/icons-svelte';
	import Feature from 'ol/Feature';
	import { Point } from 'ol/geom';
	import { positionCircle } from '../styles/circles';

	const mapContext = getMapContext();
	const controlContainers = mapContext.controlContainers;
	const map = mapContext.map;
	const view = $map.getView();
	const source = new VectorSource();
	const layer = new VectorLayer({
		map: $map,
		source,
		zIndex: Infinity
	});
	export let geolocation = new Geolocation({
		trackingOptions: {
			enableHighAccuracy: true
		},
		projection: view.getProjection()
	});

	// TODO: Show error message
	let error: GeolocationError | null = null;
	geolocation.on('error', (e) => {
		error = e;
	});

	const accuracyFeature = new Feature();
	const positionFeature = new Feature();
	positionFeature.setStyle(positionCircle); // Setting this in the constructor apparently doesn't work
	source.addFeatures([accuracyFeature, positionFeature]);

	geolocation.on('change:accuracyGeometry', () => {
		console.log(1);
		accuracyFeature.setGeometry(geolocation.getAccuracyGeometry() ?? undefined); // There are typing inconsistencies between these methods' implementations
	});

	geolocation.on('change:position', () => {
		const coordinates = geolocation.getPosition();
		positionFeature.setGeometry(coordinates && new Point(coordinates));
	});

	geolocation.setTracking(true);

	const center = () => {
		const center = geolocation.getPosition();
		if (center) {
			view.setCenter(center);
			view.setZoom(16);
		}
	};

	let control: Control;
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
	on:click={center}
	class="h-12 w-12 bg-slate-300 shadow hover:shadow-lg rounded-full place-items-center grid"
	use:createControl
>
	<IconCurrentLocation />
</button>
