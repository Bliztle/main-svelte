<script lang="ts">
	import { getDatagridContext } from '../../datagridContext';
	import type { DatagridContextColumn } from '../../types';

	export let rowIndex: number;
	export let column: DatagridContextColumn;

	let element: HTMLInputElement;
	const context = getDatagridContext();
	const editRowIndex = context.editRowIndex;
	let store = context.store;

	$: value = $store.rows[rowIndex][column.id];
	$: currentValue = value;
	$: isEditing = $editRowIndex === rowIndex;

	const onChange = (e: Event) => {
		context.store.setCell(
			rowIndex,
			column.id,
			(e.target as HTMLInputElement).value
		);
	};

	// To keep the text in the same position when editing, we need to adjust the padding of the parent element
	let initialPaddingLeft: string;
	let initialPaddingRight: string;
	$: updateParentStyle = () => {
		if (!element) return;
		const style = element.parentElement!.style;
		const computedStyle = getComputedStyle(element.parentElement!);
		initialPaddingLeft ??= computedStyle.paddingLeft;
		initialPaddingRight ??= computedStyle.paddingRight;

		if (isEditing) {
			style.paddingLeft = `calc(${initialPaddingLeft} - 10px)`;
			style.paddingRight = `calc(${initialPaddingRight} - 10px)`;
		} else {
			style.paddingLeft = initialPaddingLeft;
			style.paddingRight = initialPaddingRight;
		}
	};
	$: updateParentStyle();
</script>

{#if isEditing}
	<input
		{...column.inputProps}
		bind:value={currentValue}
		bind:this={element}
		on:change={onChange}
		type="text"
		class="{column.inputProps
			.class} pl-2 pr-2 appearance-none rounded w-full py-2 px-4 leading-tight border-2 focus:outline-none dark:bg-gray-700 border-gray-700 focus:border-purple-500"
	/>
{:else}
	{value}
{/if}
