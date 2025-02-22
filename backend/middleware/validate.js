import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv;

const userValidation = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await User.findById(data.id);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

    next();
		// return res.json({
		// 	message: "Authorized",
		// });
	});
};

export default userValidation;

