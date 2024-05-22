import Product from "../product/product.model";
import { IOrder, OrderSearchQuery } from "./order.interface";
import Order from "./order.model";

export const fetchOrders = async (searchQuery: OrderSearchQuery) => {
	return await Order.find(searchQuery);
};

export const createOrder = async (order: IOrder) => {
	const _id = order.productId;
	const updatedDoc = await Product.findOneAndUpdate(
		{ _id },
		{ $inc: { "inventory.quantity": 0 - order.quantity } },
		{ returnDocument: "after" }
	);
	if(!updatedDoc) throw new Error("Invalid productId");
	
	return await Order.create(order);
};
