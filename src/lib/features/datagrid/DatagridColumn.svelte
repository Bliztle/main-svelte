<script lang="ts">
	import type { PartialBy } from '$lib/utility/types/objects';
	import { getDatagridContext } from './datagridContext';
	import type { DatagridContextColumn } from './types';

	// Make defaulted values optional, and omit declared props from RestProps
	interface $$Props extends PartialBy<DatagridContextColumn, 'label'> {}
	type RestProps = Omit<$$Props, 'id'>;

	// Only explicitly declare props which are actively used
	export let id: $$Props['id'];

	const strId = id.toString();
	const defaults = {
		label: strId[0].toUpperCase() + strId.slice(1)
	};

	const context = getDatagridContext();
	context.columns.update((columns) => [
		...columns,
		{ id, ...defaults, ...($$restProps as RestProps) }
	]);
</script>
