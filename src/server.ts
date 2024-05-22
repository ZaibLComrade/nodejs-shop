import app from "./app";
import config from "./app/config";
import { connect } from "mongoose";

/* eslint-disable */
const main = async () => {
	// Connect to database
	await connect(config.db_uri as string, { dbName: config.db_name });
	
	// Start server
	app.listen(config.port, () => {
		console.log(`Server is running on http://localhost:${config.port}`);
	});
};
main();
