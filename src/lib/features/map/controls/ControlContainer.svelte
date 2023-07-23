<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Control from 'ol/control/Control';
	import { getMapContext } from '$lib/features/map/mapContext';
	import type { ControlContainers } from '../types';

	const mapContext = getMapContext();
	const map = mapContext.map;

	let control: Control;

	const createControl = (element: HTMLDivElement) => {
		// Find children
		const containers = {} as ControlContainers;
		(['left', 'middle', 'right'] as const).forEach((name) => {
			containers[name] = element.querySelector(
				`[data-container-name="${name}"]`
			)!;
		});

		// Set control containers and add control to map
		mapContext.controlContainers.set(containers);
		control = new Control({
			element
		});
		$map.addControl(control);
	};

	onDestroy(() => {
		$map.removeControl(control);
	});
</script>

<!-- This method is used since all this needs to happen as early as possible, as it is blocking the rest of the map from mounting -->
<!-- It is very possible onMount() would be as fast. Time of writing is second day of using svelte, I do not know the internal render cycles -->
<div
	use:createControl
	class="h-full w-full flex flex-row"
	style="pointer-events: none"
>
	<div
		data-container-name="left"
		class="inner-control-container flex-none p-2 space-y-2"
	/>
	<div
		data-container-name="middle"
		class="inner-control-container flex-1 p-2 space-y-2"
	/>
	<div
		data-container-name="right"
		class="inner-control-container flex-none p-2 space-y-2"
	/>
</div>

<style lang="postcss">
	.inner-control-container > :global(*) {
		pointer-events: auto;
	}
</style>
