<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let type: 'info' | 'success' | 'warn' | 'error' | undefined = undefined;
	export let size: 'default' | 'large' = 'default';
	export let withDot = false;
	export let shape: 'default' | 'rounded' | 'square' = 'default';
	export let onClose: (() => void) | undefined = undefined;

	const defaultClass =
		'inline-flex items-center py-0.5 font-medium transition-all duration-150 bg-opacity-20 dark:bg-opacity-20 dark:text-dark-content text-light-content bg-dark-icon-background bg-light-icon-background';
	const finalClass = twMerge(defaultClass, $$props.class);
</script>

<span
	class={finalClass}
	class:bg-opacity-20={type === 'info' || type === 'success' || type === 'warn' || type === 'error'}
	class:dark:bg-opacity-20={type === 'info' ||
		type === 'success' ||
		type === 'warn' ||
		type === 'error'}
	class:bg-info-background={type === 'info'}
	class:dark:bg-dark-info-background={type === 'info'}
	class:text-info-content={type === 'info'}
	class:dark:text-dark-info-content={type === 'info'}
	class:bg-success-background={type === 'success'}
	class:dark:bg-dark-success-background={type === 'success'}
	class:text-success-content={type === 'success'}
	class:dark:text-dark-success-content={type === 'success'}
	class:bg-warn-background={type === 'warn'}
	class:dark:bg-dark-warn-background={type === 'warn'}
	class:text-warn-content={type === 'warn'}
	class:dark:text-dark-warn-content={type === 'warn'}
	class:bg-error-background={type === 'error'}
	class:dark:bg-dark-error-background={type === 'error'}
	class:text-error-content={type === 'error'}
	class:dark:text-dark-error-content={type === 'error'}
	class:px-2.5={size === 'default'}
	class:px-3={size === 'large'}
	class:text-xs={size === 'default'}
	class:text-sm={size === 'large'}
	class:rounded-full={shape === 'default'}
	class:rounded={shape === 'rounded'}
	class:pr-0.5={onClose}
>
	{#if withDot}
		<svg
			class="-ml-0.5 mr-1.5 h-2 w-2"
			class:text-info-content={type === 'info'}
			class:dark:text-dark-info-content={type === 'info'}
			class:text-success-content={type === 'success'}
			class:dark:text-dark-success-content={type === 'success'}
			class:text-warn-content={type === 'warn'}
			class:dark:text-dark-warn-content={type === 'warn'}
			class:text-error-content={type === 'error'}
			class:dark:text-dark-error-content={type === 'error'}
			fill="currentColor"
			viewBox="0 0 8 8"
		>
			<circle cx="4" cy="4" r="3" />
		</svg>
	{/if}
	<slot />
	{#if onClose}
		<button
			on:click={onClose}
			type="button"
			class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none hover:focus:text-white hover:text-white dark:hover:text-white transition-all duration-150"
			class:hover:bg-info-background={type === 'info'}
			class:dark:hover:bg-dark-info-background={type === 'info'}
			class:text-info-content={type === 'info'}
			class:dark:text-dark-info-content={type === 'info'}
			class:hover:bg-success-background={type === 'success'}
			class:dark:hover:bg-dark-success-background={type === 'success'}
			class:text-success-content={type === 'success'}
			class:dark:text-dark-success-content={type === 'success'}
			class:hover:bg-warn-background={type === 'warn'}
			class:dark:hover:bg-dark-warn-background={type === 'warn'}
			class:text-warn-content={type === 'warn'}
			class:dark:text-dark-warn-content={type === 'warn'}
			class:hover:bg-error-background={type === 'error'}
			class:dark:hover:bg-dark-error-background={type === 'error'}
			class:text-error-content={type === 'error'}
			class:dark:text-dark-error-content={type === 'error'}
		>
			<span class="sr-only">Remove option</span>
			<svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
				<path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
			</svg>
		</button>
	{/if}
</span>
