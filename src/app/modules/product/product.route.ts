import { Router } from "express";
import {deleteProduct, getProducts, postProduct, updateProduct} from "./product.controller";

const productRoute = Router();

productRoute.get("/:productId?", getProducts);
productRoute.post("/", postProduct);
productRoute.patch("/:productId", updateProduct); // Update a product
productRoute.delete("/:productId", deleteProduct);

export default productRoute;
