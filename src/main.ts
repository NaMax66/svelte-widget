import Widget from './Widget.svelte';

export interface Identifier {
	type: 'VIN' | 'GRZ',
	placeholder: string,
	validator: RegExp
}

export default Widget;
