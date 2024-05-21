export interface IProduct {
	name: string;
	description: string;
	price: number;
	category: string,
	tags: string[],
	variants: {
		type: string;
		value: string;
	}[];
	inventory: {
		quantity: number;
		inStock: boolean;
	}
}

export interface ProductSearchQuery {
	_id?: string;
	searchTerm?: string;
}
