<script lang="ts">
	import type { DatagridContextColumn } from '../types';

	type T = $$Generic<DatagridData>;
	export let row: T;
	export let column: DatagridContextColumn;

	const value = row[column.id];
</script>

<td class="border-b border-slate-100 dark:border-slate-700 p-4">
	{value}
</td>

<style lang="postcss">
	td:first-child {
		@apply pl-8;
	}
	td:last-child {
		@apply pr-8;
	}
</style>
