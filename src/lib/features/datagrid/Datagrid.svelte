<script lang="ts">
	import writeableArray from '$lib/utility/stores/writeableArray';
	import { writable } from 'svelte/store';
	import { setDatagridContext } from './datagridContext';
	import InternalDataHeader from './internal/InternalDataHeader.svelte';
	import InternalDataRow from './internal/InternalDataRow.svelte';
	import type { DatagridContextColumn, DatagridRowData } from './types';

	export let data: DatagridRowData[];

	const context = setDatagridContext({
		columns: writeableArray<DatagridContextColumn>(),
		editRowIndex: writable<number | null>(null)
	});

	const columns = context.columns;
</script>

<table class="table-auto w-full">
	<thead class="text-slate-400 dark:text-slate-200 font-medium text-left">
		<tr>
			{#each $columns as column}
				<InternalDataHeader {column} />
			{/each}
		</tr>
	</thead>
	<tbody class="text-slate-500 dark:text-slate-400">
		{#each data as rowData, i}
			<InternalDataRow
				row={{
					index: i,
					data: rowData
				}}
			/>
		{/each}
	</tbody>
</table>
<slot />

<style lang="postcss">
</style>
