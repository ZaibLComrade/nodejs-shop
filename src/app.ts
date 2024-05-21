import express, { Express, NextFunction, Request, Response } from "express";
import productRoute from "./app/modules/product/product.route";
import cors from "cors";
import ordersRoute from "./app/modules/order/order.route";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoute);
app.use("/api/orders", ordersRoute);

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(400).json({
			succcess: false,
			message: (error?.message as string) || "Something went wrong",
			error,
		});
	} catch (err) {
		res.send(err);
	}
	next();
});

// Handles all requsts for all path (Not Found)
app.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: "Route not Found",
	});
});

// Checks server health
app.all("/health", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is running",
	});
});

export default app;
