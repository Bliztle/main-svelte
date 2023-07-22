<script lang="ts">
	import TextCell from './cells/TextCell.svelte';
	import type { DatagridContextColumn } from '../types';

	export let rowIndex: number;
	export let column: DatagridContextColumn;

	const getCell = () => {
		switch (column.type) {
			case 'text':
				return TextCell;
			default:
				return TextCell;
		}
	};

	const Cell = getCell();
</script>

<td class="border-b border-slate-100 dark:border-slate-700 p-4">
	<Cell {rowIndex} {column} />
</td>

<style lang="postcss">
	td:first-child {
		@apply pl-8;
	}
	td:last-child {
		@apply pr-8;
	}
</style>
