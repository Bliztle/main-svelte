<script lang="ts">
	import type { DatagridContextColumn } from '../types';

	export let column: DatagridContextColumn;
</script>

<th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">
	{column.label}
</th>

<style lang="postcss">
	th:first-child {
		@apply pl-8;
	}
	th:last-child {
		@apply pr-8;
	}
</style>
