<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import { setMapContext } from './mapContext';
	import { onDestroy } from 'svelte';
	import { readable, writable } from 'svelte/store';

	let _map: Map;
	let map = readable<Map>(undefined, (set) => set(_map));

	setMapContext({
		map
	});

	const initialise = (target: HTMLDivElement) => {
		_map = new Map({
			target,
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});
	};

	onDestroy(() => {
		_map?.dispose();
	});
</script>

<div use:initialise class="w-full h-full">
	{#if _map}
		<slot />
	{/if}
</div>
