export interface IOrder {
	email: string;
	productId: string;
	price: number;
	quantity: number;
}

export interface OrderSearchQuery {
	_id?: string,
	email?: string
}
