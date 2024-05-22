import app from "./app";
import config from "./config";
import { connect } from "mongoose";

/* eslint-disable */
const main = async () => {
	await connect(config.db_uri as string, { dbName: config.db_name });
	app.listen(config.port, () => {
		console.log(`Server is running on http://localhost:${config.port}`);
	});
};
main();
