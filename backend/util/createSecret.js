import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

export function createSecret(id) {
	return jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: 60 * 60 * 24 * 3, // 3 days
	});
}