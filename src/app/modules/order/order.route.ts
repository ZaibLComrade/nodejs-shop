import { Router } from "express";
import { getOrder, postOrder } from "./order.controller";

const ordersRoute = Router();

ordersRoute.get("/", getOrder);
ordersRoute.post("/", postOrder);

export default ordersRoute;
