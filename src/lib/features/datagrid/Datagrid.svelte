<script lang="ts">
	import writeableArray from '$lib/utility/stores/writeableArray';
	import { writable } from 'svelte/store';
	import { setDatagridContext } from './datagridContext';
	import InternalDataHeader from './internal/InternalDataHeader.svelte';
	import InternalDataRow from './internal/InternalDataRow.svelte';
	import type { DatagridContextColumn, DatagridStore } from './types';
	import { datagridStore } from './datagridStore';

	type TRow = $$Generic<DatagridRowData>;

	export let data: TRow[] | null = null;
	export let url: string | null = null;
	export let store: DatagridStore<TRow> = datagridStore(data, url);

	const context = setDatagridContext({
		columns: writeableArray<DatagridContextColumn>(),
		editRowIndex: writable<number | null>(null),
		store: store
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
		{#each $store.rows as row, rowIndex (row)}
			<InternalDataRow {rowIndex} />
		{/each}
	</tbody>
</table>
<slot />
