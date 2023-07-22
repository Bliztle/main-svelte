<div class="h-full w-full flex flex-col">
	<div class="flex-none">
		<slot name="header" />
	</div>
	<div class="flex-1">
		<slot />
	</div>
	<div class="flex-none">
		<slot name="footer" />
	</div>
</div>
