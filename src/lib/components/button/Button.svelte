<script lang="ts" context="module">
	export const BUTTON_CONTEXT_ID = 'button-context-id';
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils/forwardEventsBuilder';
	import { useActions, type ActionArray } from '../../utils/useActions';
	import { exclude } from '../../utils/exclude';
	export let use: ActionArray = [];
	const forwardEvents = forwardEventsBuilder(current_component);

	import ButtonLoader from './Loader.svelte';
	import HoverBackground from '../HoverBackground.svelte';
	import { validateSlots } from '$lib/utils/validateSlots';
	import Swap from '../swap/Swap.svelte';

	export let disabled: false | true = false;
	export let htmlType: 'button' | 'submit' | 'reset' = 'button';
	export let loading: false | true | undefined = undefined;
	export let defaultLoading = true;
	export let type:
		| 'default'
		| 'primary'
		| 'danger'
		| 'ghost'
		| 'link'
		| 'text'
		| 'dark'
		| undefined = undefined;
	export let loaderColor: string | undefined = undefined;
	export let shape: 'square' | 'circle' | 'rounded' | 'pill' = 'rounded';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fab' = 'md';

	const buttonLoaderColor = loaderColor
		? loaderColor
		: type === 'primary'
		? '#ffffff'
		: type === 'danger'
		? '#ffffff'
		: type === 'link'
		? '#2563eb'
		: '#000000';

	validateSlots($$slots, ['leading', 'icon', 'default', 'trailing'], 'Button');

	setContext(BUTTON_CONTEXT_ID, {
		button: true,
		size
	});

	let defaultClass =
		'btn group transition-all duration-150 relative inline-flex justify-center items-center font-medium active:hover:animate-none active:hover:scale-95 outline-none';
	if (loading) {
		defaultClass += ' cursor-wait';
	} else {
		defaultClass += ' cursor-pointer';
	}
	const finalClass = twMerge(defaultClass, $$props.class);

	const hoverClass =
		shape === 'circle'
			? 'rounded-full'
			: shape === 'rounded'
			? 'rounded-md'
			: shape === 'pill'
			? 'rounded-3xl'
			: 'rounded-none';
</script>

<button
	type={htmlType}
	{disabled}
	class={finalClass}
	class:primary={type === 'primary'}
	class:danger={type === 'danger'}
	class:default={type === 'default'}
	class:ghost={type === 'ghost'}
	class:link={type === 'link'}
	class:text={type === 'text'}
	class:dark={type === 'dark'}
	class:circle={shape === 'circle'}
	class:rounded={shape === 'rounded'}
	class:square={shape === 'square'}
	class:pill={shape === 'pill'}
	class:xs={size === 'xs'}
	class:sm={size === 'sm'}
	class:md={size === 'md'}
	class:lg={size === 'lg'}
	class:xl={size === 'xl'}
	class:fab={size === 'fab'}
	style={$$props.style}
	use:useActions={use}
	use:forwardEvents
	{...exclude($$props, ['use', 'class'])}
>
	{#if defaultLoading && $$slots.leading}
		<div class="mr-2 flex justify-center items-center relative">
			<Swap {loading}>
				<svelte:fragment slot="icon1">
					<slot name="leading" />
				</svelte:fragment>
				<svelte:fragment slot="icon2">
					<ButtonLoader color={buttonLoaderColor} />
				</svelte:fragment>
			</Swap>
		</div>
		<slot />
		<slot name="trailing" />
	{:else if defaultLoading && $$slots.icon}
		<div class="flex justify-center items-center relative">
			<Swap {loading}>
				<svelte:fragment slot="icon1">
					<slot name="icon" />
				</svelte:fragment>
				<svelte:fragment slot="icon2">
					<ButtonLoader color={buttonLoaderColor} />
				</svelte:fragment>
			</Swap>
		</div>
		<slot />
		<slot name="trailing" />
	{:else if loading && defaultLoading && !$$slots.leading && !$$slots.icon}
		<div transition:scale|local class="mr-2 flex justify-center items-center relative">
			<ButtonLoader color={buttonLoaderColor} />
		</div>
		<slot />
		<slot name="trailing" />
	{:else}
		<slot name="leading" />
		<slot name="icon" />
		<slot />
		<slot name="trailing" />
	{/if}

	{#if !disabled}
		<HoverBackground class={hoverClass} />
	{/if}
</button>
