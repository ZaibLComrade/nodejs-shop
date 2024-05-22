import Product from "../product/product.model";
import { IOrder, OrderSearchQuery } from "./order.interface";
import Order from "./order.model";

export const fetchOrders = async (searchQuery: OrderSearchQuery) => {
	return await Order.find(searchQuery);
};

export const createOrder = async (order: IOrder) => {
	const _id = order.productId;

	// Modifies inventory acccordingly
	const product = await Product.findOne({ _id });
	product.inventory.quantity -= order.quantity;
	product.inventory.inStock = product.inventory.quantity > 0;
	if (product.inventory.quantity < 0) {
		throw new Error("Insufficient quantity available in inventory");
	}
	product.save();

	return await Order.create(order);
};
