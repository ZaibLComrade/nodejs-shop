import { NextFunction, Request, Response } from "express";
import { IProduct, ProductSearchQuery } from "./product.interface";
import { ProductSchema } from "./product.validation";
import { createProduct, fetchProduct, removeProduct, updateProductDetails } from "./product.service";

// Get one / all products
export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const searchQuery: ProductSearchQuery = {};
		const _id = req.params?.productId as string;
		if(_id) searchQuery._id = _id;
		
		const data = await fetchProduct(searchQuery);
		res.status(200).json({
			success: true,
			message: "Products fetched successfully!",
			data,
		});
	} catch (err) {
		next(err);
	}
};

// Post a product into DB
export const postProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = req.body;
		const validatedProduct: IProduct = ProductSchema.parse(product);
		const data = await createProduct(validatedProduct);
		res.status(200).json({
			success: true,
			message: "Product created successfully!",
			data,
		});
	} catch (err) {
		next(err);
	}
};

// Update product details
export const updateProduct = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try{
		const _id = req.params.productId;
		const updateDetails = req.body;
		const data = await updateProductDetails(_id, updateDetails);
		res.status(200).json({
			success: true,
			message: "Product updated successfully!",
			data,
		})
	} catch(err) {
		next(err);
	}
}

export const deleteProduct = async(
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const _id = req.params.productId;
		await removeProduct(_id);
		res.status(200).json({
			success: true,
			message: "Product deleted successfully!",
			data: null,
		})
	} catch(err) {
		next(err);
	}
}
