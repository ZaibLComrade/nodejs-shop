export interface IProduct {
	name: string;
	description: string;
	price: number;
	category: string,
	tags: [string],
	variant: [{
		type: string;
		value: string;
	}]
	inventory: {
		quantity: number;
		inStock: boolean;
	}
}
