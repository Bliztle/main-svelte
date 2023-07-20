<script lang="ts">
	import { getMapContext } from './mapContext';

	// import { getContext } from 'svelte';
	// import { mapContext } from './map';

	// // const { getMap } = getContext(mapContext);
	// getMapService();

	const mapContext = getMapContext();
	console.log('Context map: ', mapContext.getMap());
</script>
