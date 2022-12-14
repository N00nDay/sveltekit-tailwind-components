import OriginalButton from './Button.svelte';
import Loader from './Loader.svelte';
import OriginalLeading from './Leading.svelte';
import OriginalTrailing from './Trailing.svelte';
import Icon from './Icon.svelte';

const Button = OriginalButton as ButtonStatic;
Button.Loader = Loader;
Button.Leading = OriginalLeading as LeadingStatic;
Button.Trailing = OriginalTrailing as TrailingStatic;
Button.Icon = Icon;
Button.Leading.Icon = Icon;
Button.Trailing.Icon = Icon;

export default Button;

export interface ButtonStatic {
	new (...args: ConstructorParameters<typeof OriginalButton>): OriginalButton;
	Loader: typeof Loader;
	Icon: typeof Icon;
	Leading: LeadingStatic;
	Trailing: TrailingStatic;
}

export interface LeadingStatic {
	new (...args: ConstructorParameters<typeof OriginalLeading>): OriginalLeading;
	Icon: typeof Icon;
}

export interface TrailingStatic {
	new (...args: ConstructorParameters<typeof OriginalTrailing>): OriginalTrailing;
	Icon: typeof Icon;
}
