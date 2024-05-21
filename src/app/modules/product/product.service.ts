import { IProduct, ProductSearchQuery,  } from "./product.interface";
import Product from "./product.model";

export const fetchProduct = async (searchQuery: ProductSearchQuery) => {
	return await Product.find(searchQuery);
};

export const createProduct = async (product: IProduct) => {
	return await Product.create(product);
};
