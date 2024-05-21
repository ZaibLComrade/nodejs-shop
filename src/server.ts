import app from "./app";
import config from "./config";
import { connect } from "mongoose";

const main = async () => {
	app.listen(config.port || 5000, () => {
		console.log(`Server is running on http://localhost:${config.port}`);
	})
}
main();
