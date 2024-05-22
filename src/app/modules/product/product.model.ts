import { Schema, model, models } from "mongoose";
import { IProduct, IProductMethods, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel, IProductMethods>({
	name: { type: String, required: [true, "Name is required"] },
	description: { type: String },
	price: { type: Number, required: [true, "Price is required"] },
	category: {
		type: String,
		required: [true, "Category is required"],
	},
	tags: [String],
	variants: [
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
			type: Number,
			min: [0, "Quantity can't be a negative number"],
			default: 0,
		},
		inStock: { type: Boolean, default: false },
	},
});

productSchema.index(
	{ name: "text", description: "text", category: "text" },
	{
		weights: {
			name: 3,
			category: 2,
			description: 1,
		},
	}
);

// Instance method to check if product is in stock
productSchema.methods.isInStock = function () {
	return this.inventory.inStock;
};

// Synchronizes inStock property
productSchema.pre("save", function (next) {
	this.inventory.inStock = this.inventory.quantity > 0;
	next();
});

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
