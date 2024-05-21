import { Schema, model, models } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema({
	name: { type: String, required: [true, "Name is required"] },
	description: String,
	price: { type: Number, required: [true, "Price is required"] },
	category: { type: String, required: [true, "Category is required"] },
	tags: [String],
	variant: [
		{
			type: {
				type: String,
				required: [true, "Variant type is required"],
			},
			value: {
				type: String,
				required: [true, "Variant value is required"],
			},
		},
	],
	inventory: {
		quantity: {
			type: String,
			min: [0, "Quantity can't be a negative number"],
			default: 0,
		},
		inStock: { type: Boolean, default: false },
	},
});

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
