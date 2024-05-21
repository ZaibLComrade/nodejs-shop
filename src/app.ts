import express, { Express, Request, Response } from "express";
import productRoute from "./app/modules/product/product.route";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoute)

// Checks server health
app.all("/health", async(req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is running"
	})
})

export default app;
