import { IOrder, OrderSearchQuery } from "./order.interface";
import Order from "./order.model";

export const fetchOrders = async(searchQuery: OrderSearchQuery) => {
	return await Order.find(searchQuery);
}

export const createOrder = async (order: IOrder) => {
	return await Order.create(order);
};
