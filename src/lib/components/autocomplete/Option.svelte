<script lang="ts">
	import { scale } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { AUTOCOMPLETE_CONTEXT_ID } from './Autocomplete.svelte';
	import { AUTOCOMPLETE_LIST_CONTEXT_ID } from './List.svelte';
	import { twMerge } from 'tailwind-merge';
	import { useContext } from '$lib/utils/useContext';
	import HoverBackground from '../HoverBackground.svelte';

	export let value: string;
	export let selected = false;

	useContext({
		context_id: AUTOCOMPLETE_CONTEXT_ID,
		parent: 'Autocomplete',
		component: 'Autocomplete.List.Item'
	});

	useContext({
		context_id: AUTOCOMPLETE_LIST_CONTEXT_ID,
		parent: 'Autocomplete.List',
		component: 'Autocomplete.List.Item'
	});

	const {
		handleSelect
	}: {
		handleSelect: (option: string) => void;
	} = getContext(AUTOCOMPLETE_CONTEXT_ID);

	const defaultClass =
		'group text-light-content dark:text-dark-content cursor-pointer select-none p-0.5 w-full';
	const finalClass = twMerge(defaultClass, $$props.class);
</script>

<li class={finalClass} role="option" aria-selected={selected} on:click={() => handleSelect(value)}>
	<div class="relative py-1.5 pl-2.5 pr-7 w-full rounded-md overflow-hidden">
		<span class="font-normal block truncate" class:font-semibold={selected}>
			{value}
		</span>

		{#if selected}
			<span
				transition:scale|local
				class="text-primary absolute inset-y-0 right-0 flex items-center pr-4"
			>
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		{/if}

		<HoverBackground />
	</div>
</li>
