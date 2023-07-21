<!-- drawer component -->

<script lang="ts">
	export let text: string;
	const defaultOffset = 57;

	let containerHeight = 0;
	const trackSize = (container: HTMLDivElement) => {
		const observer = new ResizeObserver(() => {
			containerHeight = container.offsetHeight;
		});

		observer.observe(container);
	};

	let offset = defaultOffset;
	const onMouseDown = (downEvent: MouseEvent) => {
		let prevY = downEvent.clientY;

		const onMouseMove = (moveEvent: MouseEvent) => {
			// Clamp offset value
			offset = Math.max(
				defaultOffset,
				Math.min(
					defaultOffset + containerHeight,
					offset + (prevY - moveEvent.clientY)
				)
			);
			prevY = moveEvent.clientY;
		};

		const onMouseUp = () => {
			document.removeEventListener('mousemove', onMouseMove);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp, { once: true });
	};
</script>

<div
	style="bottom: {offset}px;"
	class="fixed z-40 w-full overflow-y-auto border-t rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform left-0 right-0 translate-y-full bottom-[60px]"
	tabindex="-1"
	aria-labelledby="drawer-swipe-label"
>
	<div
		class="p-4 cursor-pointer dark:hover:bg-gray-700"
		on:mousedown={onMouseDown}
		role="slider"
		tabindex="-1"
		aria-valuenow={offset}
	>
		<span
			class="absolute w-8 h-1 -translate-x-1/2 rounded-lg top-3 left-1/2 dark:bg-gray-600"
		/>
		<h5
			class="inline-flex items-center text-base dark:text-gray-400 font-medium"
		>
			{text}
		</h5>
	</div>
	<div use:trackSize class="h-fit w-fit">
		<slot />
	</div>
</div>
