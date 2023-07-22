<script lang="ts">
	import { getMapContext } from '../mapContext';
	import type { GeolocationError } from 'ol/Geolocation';
	import VectorSource from 'ol/source/Vector';
	import { Vector as VectorLayer } from 'ol/layer';
	import { onDestroy } from 'svelte';
	import { setupGeolocation } from './GpsControl';
	import Control from 'ol/control/Control';
	import { IconCurrentLocation } from '@tabler/icons-svelte';

	const mapContext = getMapContext();
	const map = mapContext.getMap();
	const view = map.getView();
	const layer = new VectorLayer({
		map,
		source: new VectorSource()
	});
	const geolocation = setupGeolocation(map, layer);

	let control: Control;

	// TODO: Show error message
	let error: GeolocationError | null = null;
	geolocation.on('error', (e) => {
		error = e;
	});

	const createControl = (element: HTMLButtonElement) => {
		control = new Control({
			element
		});
		map.addControl(control);
	};

	const center = () => {
		const center = geolocation.getPosition();
		if (center) {
			view.setCenter(center);
			view.setZoom(16);
		}
	};

	onDestroy(() => {
		map.removeLayer(layer);
		map.removeControl(control);
	});
</script>

<button
	on:click={center}
	class="h-12 w-12 bg-slate-300 shadow hover:shadow-lg rounded-full place-items-center grid"
	use:createControl
>
	<IconCurrentLocation />
</button>
