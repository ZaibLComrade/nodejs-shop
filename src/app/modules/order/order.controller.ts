import { Request, Response, NextFunction } from "express";
import { IOrder, OrderSearchQuery } from "./order.interface";
import { createOrder, fetchOrders } from "./order.service";
import { OrderSchema } from "./order.validation";

// Get one / many / all orders
export const getOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const searchQuery: OrderSearchQuery = {};

		// Modifying search query
		const _id = req.params?.orderId as string;
		if (_id) searchQuery._id = _id;
		const email = req.query?.email as string;
		if (email) searchQuery.email = email;

		const data = await fetchOrders(searchQuery);
		if(data.length) {
		res.status(200).json({
			success: true,
			message: email
				? `Orders fetched successfully for ${email}!`
				: "Orders fetched successfully",
			data,
		});
		} else {
			res.status(400).json({
				success: false,
				message: "Order not found"
			})
		}
	} catch (err) {
		next(err);
	}
};

// Create Order
export const postOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const order: IOrder = req.body;
		const validatedOrder = OrderSchema.parse(order);
		const data = await createOrder(validatedOrder);
		res.status(200).json({
			success: true,
			message: "Order created successfully!",
			data,
		});
	} catch (err) {
		next(err);
	}
};
