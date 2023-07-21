<script lang="ts">
	import { getDatagridContext } from '../datagridContext';
	import type { DatagridRow } from '../types';
	import InternalDataCell from './InternalDataCell.svelte';

	export let row: DatagridRow;

	const context = getDatagridContext();
	const columns = context.columns;

	const onDoubleClick = () => {
		context.editRowIndex.set(row.index);
	};
</script>

<tr on:dblclick={onDoubleClick}>
	{#each $columns as column}
		<InternalDataCell {row} {column} />
	{/each}
</tr>
