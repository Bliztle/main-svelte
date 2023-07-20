<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import { setMapContext } from './mapContext';
	import { onDestroy } from 'svelte';

	let map: Map;

	setMapContext({
		getMap: () => map
	});

	const initialise = (target: HTMLDivElement) => {
		map = new Map({
			target,
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});
		console.log('Map initialised: ', map);
	};

	onDestroy(() => {
		map?.dispose();
	});
</script>

<div use:initialise class="w-full h-full">
	{#if map}
		<slot />
	{/if}
</div>
