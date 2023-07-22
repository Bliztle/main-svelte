<script lang="ts">
	import { getDatagridContext } from '../datagridContext';
	import InternalDataCell from './InternalDataCell.svelte';

	export let rowIndex: number;

	const context = getDatagridContext();
	const columns = context.columns;

	const onDoubleClick = () => {
		context.editRowIndex.set(rowIndex);
	};
</script>

<tr on:dblclick={onDoubleClick}>
	{#each $columns as column}
		<InternalDataCell {rowIndex} {column} />
	{/each}
</tr>
