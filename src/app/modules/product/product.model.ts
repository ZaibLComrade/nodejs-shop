import { Schema, UpdateQuery, model, models } from "mongoose";
import { IProduct, IProductMethods, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel, IProductMethods>({
	name: { type: String, required: [true, "Name is required"], text: true },
	description: { type: String, text: true },
	price: { type: Number, required: [true, "Price is required"] },
	category: { type: String, required: [true, "Category is required"], text: true },
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

// Instance method to check if product is in stock
productSchema.methods.isInStock = function () {
	return this.inventory.inStock;
};

// Synchronizes inStock property
productSchema.pre("save", function (next) {
	this.inventory.inStock = this.inventory.quantity > 0;
	next();
});

interface QuantityUpdate extends UpdateQuery<unknown> {
	$inc: { "inventory.quantity": number };
}

productSchema.pre("findOneAndUpdate", async function (next) {
	const doc = await this.model.findOne(this.getQuery());
	const update = this.getUpdate() as QuantityUpdate;
	const keys = Object.keys(update || {});

	// Checks for quantity update
	let quantityUpdate: false | number = false;
	if (keys.includes("inventory.quantity")) {
		quantityUpdate = update?.["inventory.quantity"];
	}

	// Checks for quantity increment
	let quantityIncrement: false | number = false;
	let isQuantityAvailable: boolean = true;
	if (keys.includes("$inc")) {
		const incrementKeys = Object.keys(update?.$inc);
		if (incrementKeys.includes("inventory.quantity")) {
			quantityIncrement = update?.$inc?.["inventory.quantity"];
			isQuantityAvailable = !(
				doc.inventory.quantity + quantityIncrement >
				0
			);
		}
	}

	if(!isQuantityAvailable) throw new Error("Insufficient quantity available in inventory")

	console.log(typeof quantityUpdate);
	// Sets inStock property according to quantity updates
	if (
		(doc && doc.inventory.quantity <= 0) ||
		(typeof quantityUpdate === "number" && quantityUpdate <= 0)
	) {
		this.set("inventory.inStock", false);
	} else {
		console.log(quantityUpdate);
		this.set("inventory.inStock", true);
	}
	next();
});

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
