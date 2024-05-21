import app from "./app";
import config from "./config";
import { connect } from "mongoose";

const main = async () => {
	try {
		await connect(config.db_uri as string, { dbName: config.db_name });
		console.info("==== MongoDB Connected ====")
	} catch (err) {
		console.error(err);
	}
	
	app.listen(config.port || 5000, () => {
		console.log(`Server is running on http://localhost:${config.port}`);
	})
}
main();
