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
	const moveDrawer = (distance: number) => {
		offset = Math.max(
			// Lower limit from drawer height
			defaultOffset,

			Math.min(
				// The distance we are actually attempting to move the drawer
				offset + distance,

				// Upper limit from content height
				defaultOffset + containerHeight,

				// Upper limit from screen height
				document.body.offsetHeight * 0.75
			)
		);
	};

	let mouseDownTime = 0;
	const onMouseDown = (downEvent: MouseEvent) => {
		let prevY = downEvent.clientY;
		mouseDownTime = Date.now();

		const onMouseMove = (moveEvent: MouseEvent) => {
			moveDrawer(prevY - moveEvent.clientY);
			prevY = moveEvent.clientY;
		};

		const onMouseUp = () => {
			document.removeEventListener('mousemove', onMouseMove);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp, { once: true });
	};

	const onClick = () => {
		if (Date.now() - mouseDownTime > 200) return;

		// Move drawer to the top
		const currentOffset = offset;
		moveDrawer(9999);

		// If it didn't move far, close it instead
		if (Math.abs(currentOffset - offset) < 50) moveDrawer(-9999);
	};
</script>

<div
	style="bottom: {offset}px;"
	class="fixed z-40 w-full overflow-y-auto border-t rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform left-0 right-0 translate-y-full"
	tabindex="-1"
	aria-labelledby="drawer-swipe-label"
>
	<button
		class="p-4 cursor-pointer dark:hover:bg-gray-700 w-full text-left"
		on:click={onClick}
		on:mousedown={onMouseDown}
	>
		<span
			class="absolute w-8 h-1 -translate-x-1/2 rounded-lg top-3 left-1/2 dark:bg-gray-600"
		/>
		<h5
			class="inline-flex items-center text-base dark:text-gray-400 font-medium"
		>
			{text}
		</h5>
	</button>
	<div class="w-full">
		<div use:trackSize class="w-full">
			<slot />
		</div>
	</div>
</div>
