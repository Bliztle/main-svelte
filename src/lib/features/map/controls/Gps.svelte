<script lang="ts">
	import { getMapContext } from '../mapContext';
	import type { GeolocationError } from 'ol/Geolocation';
	import { Point } from 'ol/geom';
	import VectorSource from 'ol/source/Vector';
	import { Vector as VectorLayer } from 'ol/layer';
	import { onDestroy } from 'svelte';
	import { setupGeolocation } from './Gps';
	import Control from 'ol/control/Control';
	import { create } from 'ol/transform';

	const mapContext = getMapContext();
	const map = mapContext.getMap();
	const layer = new VectorLayer({
		map,
		source: new VectorSource()
	});
	const geolocation = setupGeolocation(map, layer);

	// TODO: Show error message
	let error: GeolocationError | null = null;
	geolocation.on('error', (e) => {
		error = e;
	});

	const createControl = (element: HTMLDivElement) => {
		const control = new Control({
			element
		});
		map.addControl(control);
		console.log('control added');
	};

	onDestroy(() => {
		map.removeLayer(layer);
	});
</script>

<div class="" use:createControl />
