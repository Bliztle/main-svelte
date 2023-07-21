<script lang="ts">
	import writeableArray from '$lib/utility/stores/writeableArray';
	import { setDatagridContext } from './datagridContext';
	import InternalDataHeader from './internal/InternalDataHeader.svelte';
	import InternalDataRow from './internal/InternalDataRow.svelte';
	import type { DatagridContextColumn, DatagridData } from './types';

	type T = $$Generic<DatagridData>;
	export let data: T[];

	const columns = writeableArray<DatagridContextColumn>();

	setDatagridContext({
		columns
	});
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
		{#each data as row}
			<InternalDataRow {row} />
		{/each}
	</tbody>
</table>
<slot />

<style lang="postcss">
</style>
