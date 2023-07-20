<script lang="ts">
	import { getMapContext } from '../mapContext';
	import OSM from 'ol/source/OSM';
	import TileLayer from 'ol/layer/Tile';

	const mapContext = getMapContext();
	const map = mapContext.getMap();
	const layer = new TileLayer({
		source: new OSM()
	});

	map.addLayer(layer);

	// onDestroy(() => {
	// 	map.removeLayer(layer);
	// });
</script>
