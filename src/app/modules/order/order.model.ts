import { Schema, model, models } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema({
	email: {
		type: String,
		validate: {
			validator: function (value: string) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			},
			message: ({ value }: { value: string }) =>
				`${value} is not a valid email`,
		},
		unique: true,
	},
	productId: { type: String, unique: true },
	price: { type: Number, min: [0, "Price invalid"] },
	quantity: { type: Number, min: [0, "Quantity invalid"] },
});

const Order = models.Order || model<IOrder>("Order", orderSchema);
export default Order;
