import { Router } from "express";
import {postProduct} from "./product.controller";

const productRoute = Router();

productRoute.post("/", postProduct)

export default productRoute;
