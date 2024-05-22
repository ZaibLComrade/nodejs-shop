import { IProduct, ProductSearchQuery } from "./product.interface";
import Product from "./product.model";

export const fetchProduct = async (
	searchQuery: ProductSearchQuery,
	searchTerm?: string
) => {
	if (searchTerm)
		return await Product.find({
			...searchQuery,
			$text: { $search: searchTerm, $caseSensitive: false },
		});
	return await Product.find(searchQuery);
};

export const createProduct = async (product: IProduct) => {
	return await Product.create(product);
};

export const updateProductDetails = async (_id: string, details: IProduct) => {
	return await Product.findOneAndUpdate({ _id }, details, {
		returnDocument: "after",
	});
};

export const removeProduct = async (_id: string) => {
	return await Product.deleteOne({ _id });
};
