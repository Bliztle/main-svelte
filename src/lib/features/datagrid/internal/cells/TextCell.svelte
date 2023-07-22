<script lang="ts">
	import { getDatagridContext } from '../../datagridContext';
	import type { DatagridContextColumn, DatagridRow } from '../../types';

	export let row: DatagridRow;
	export let column: DatagridContextColumn;

	$: value = row.data[column.id];
	$: currentValue = value;

	let element: HTMLInputElement;

	const context = getDatagridContext();
	const editRowIndex = context.editRowIndex;
	$: isEditing = $editRowIndex === row.index;

	const onChange = (e: Event) => {
		row.data[column.id] = (e.target as HTMLInputElement).value;
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
