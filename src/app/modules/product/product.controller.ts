import { NextFunction, Request, Response } from "express";
import { IProduct } from "./product.interface";
import {ProductSchema} from "./product.validation";
import {createProduct} from "./product.service";

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
			message: "Successfully created product",
			data,
		})
	} catch (err) {
		next(err);
	}
};
