import { Router } from "express";
import {getProducts, postProduct} from "./product.controller";

const productRoute = Router();

productRoute.get("/", getProducts);
productRoute.get("/:productId", getProducts); // Get one product
productRoute.post("/", postProduct);

export default productRoute;
