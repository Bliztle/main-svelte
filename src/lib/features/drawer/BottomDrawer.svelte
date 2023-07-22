<script lang="ts">
	import { isTouchEvent } from '$lib/utility/events/touch';

	export let text: string;
	const defaultOffset = 57;

	let upperLimit = 0;
	let offset = defaultOffset;
	$: isOpen = upperLimit - offset < 50;

	const trackSize = (container: HTMLDivElement) => {
		const observer = new ResizeObserver(() => {
			upperLimit = Math.min(
				// Upper limit from content height
				defaultOffset + container.offsetHeight,

				// Upper limit from screen height
				document.body.offsetHeight * 0.75
			);
		});

		observer.observe(container);
	};

	const moveDrawer = (distance: number) => {
		offset = Math.max(defaultOffset, Math.min(offset + distance, upperLimit));
	};

	let pressDownTime = 0;
	const onPressDown = (downEvent: MouseEvent | TouchEvent) => {
		let prevY: number;

		// Function for getting Y coordinate from event
		const getY = (event: MouseEvent | TouchEvent) => {
			if (isTouchEvent(event)) {
				if (event.touches.length > 1) return prevY;
				return event.touches[0].clientY;
			} else return event.clientY;
		};

		prevY = getY(downEvent);
		pressDownTime = Date.now();

		const onMove = (moveEvent: MouseEvent | TouchEvent) => {
			const y = getY(moveEvent);
			moveDrawer(prevY - y);
			prevY = y;
		};

		const moveEventName = isTouchEvent(downEvent) ? 'touchmove' : 'mousemove';
		const releaseEventName = isTouchEvent(downEvent) ? 'touchend' : 'mouseup';

		const onRelease = () => {
			document.removeEventListener(moveEventName, onMove);
		};

		document.addEventListener(moveEventName, onMove);
		document.addEventListener(releaseEventName, onRelease, { once: true });
	};

	const onClick = () => {
		if (Date.now() - pressDownTime > 200) return;

		if (isOpen) moveDrawer(-9999);
		else moveDrawer(9999);
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
		on:mousedown={onPressDown}
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
	<div
		style="height: {offset - defaultOffset}px"
		class="w-full {isOpen ? 'overflow-auto' : 'overflow-hidden'}"
	>
		<div use:trackSize class="w-full">
			<slot />
		</div>
	</div>
</div>
