<script lang="ts">
	import { getDatagridContext } from '../datagridContext';
	import type { DatagridData } from '../types';
	import InternalDataCell from './InternalDataCell.svelte';

	type T = $$Generic<DatagridData>;
	export let row: T;

	const context = getDatagridContext();
	const columns = context.columns;
</script>

<tr>
	{#each $columns as column}
		<InternalDataCell {row} {column} />
	{/each}
</tr>
