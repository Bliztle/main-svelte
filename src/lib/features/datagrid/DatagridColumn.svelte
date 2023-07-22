<script lang="ts">
	import { getDatagridContext } from './datagridContext';
	import type { DatagridContextColumn } from './types';

	export let id: DatagridContextColumn['id'];
	export let label: DatagridContextColumn['label'] = id.toString();
	export let type: DatagridContextColumn['type'];
	export let inputProps: DatagridContextColumn['inputProps'] = {};

	label = label[0].toUpperCase() + label.slice(1);

	const context = getDatagridContext();
	context.columns.update((columns) => [
		...columns,
		{ id, label, type, inputProps }
	]);
</script>
