<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { POST_CONTEXT_ID } from './Post.svelte';
	import { POST_ACTIONS_CONTEXT_ID } from './Actions.svelte';
	import { useContext } from '../../utils/useContext';
	import type MaterialIcons from '../../types/material-icons';
	import HoverBackground from '../HoverBackground.svelte';

	import { current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils/forwardEventsBuilder';
	import { useActions, type ActionArray } from '../../utils/useActions';
	import { exclude } from '../../utils/exclude';
	export let use: ActionArray = [];
	const forwardEvents = forwardEventsBuilder(current_component);

	export let icon: MaterialIcons;
	export let label: string | undefined = undefined;

	useContext({
		context_id: POST_CONTEXT_ID,
		parent: 'Post',
		component: 'Post.Actions.Action'
	});
	useContext({
		context_id: POST_ACTIONS_CONTEXT_ID,
		parent: 'Post.Actions',
		component: 'Post.Actions.Action'
	});

	const defaultClass =
		'group relative transition-all duration-150 w-full h-full cursor-pointer first:rounded-bl-md last:rounded-br-md overflow-hidden';
	const finalClass = twMerge(defaultClass, $$props.class);
</script>

<div
	class={finalClass}
	style={$$props.style}
	use:useActions={use}
	use:forwardEvents
	{...exclude($$props, ['use', 'class'])}
>
	<div
		class="group relative flex flex-col items-center justify-center h-full w-full transition-all duration-150 group-active:hover:animate-none group-active:hover:scale-90"
	>
		<span
			class="material-icons h-6 w-6 transition-all duration-150 text-light-icon dark:text-dark-icon group-hover:text-primary"
			>{icon}</span
		>
		{#if label}
			<span
				class="text-xs transition-all duration-150 text-light-icon dark:text-dark-icon group-hover:text-primary"
				>{label}</span
			>
		{/if}
	</div>
	<HoverBackground />
</div>
