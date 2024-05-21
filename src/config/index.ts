import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const dev = process.env.NODE_ENV === "development" ? true : false;
const config = {
	port: process.env.PORT,
	db_uri: dev ? process.env.DB_URI_LOCAL : process.env.DB_URI_PROD,
	db_name: process.env.DB_NAME,
};

export default config;
