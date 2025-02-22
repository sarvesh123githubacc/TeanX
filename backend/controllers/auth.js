import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createSecret } from "../util/createSecret.js";

const userSignup = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        country,

    } = req.body;

    if (!email || !password || !firstName || !lastName || !country ){
        return res.json({
            meassage : "firstName, lastName, email, password, country are required",
        });
    }

    if (password.len < 8) {
        return res.json({
            meassage : "Password must be atleast 8 long",
        });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.json ({
            message: "User already exists", 
        });
    }

    const result = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        country: country,
    });

    const token = createSecret(result._id);
	res.cookie("token", token, {
		withCredentials: true,
		httpOnly: false,
	});
	res.cookie("id", result._id, {
		withCredentials: true,
		httpOnly: false,
	});
	res
		.status(201)
		.json({ message: "User signed in successfully", success: true, result });
	next();

}

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.json({ message: "Email and password are required" });
	}


	const user = await User.findOne({ email });
	if (!user) {
		return res.json({ messgae: "User does not exist" });
	}
	// const auth = await bcrypt.compare(password, user.password);
	if (!password == user.password) {
		return res.json({ message: "Incorrect password or email" });
	}
	const token = createSecret(user._id);
	res.cookie("token", token, {
		withCredentials: true,
		httpOnly: false,
	});
	res.cookie("id", user._id, {
		withCredentials: true,
		httpOnly: false,
	});
	res
		.status(200)
		.json({ message: "User logged in successfully", success: true });
};

export { userLogin, userSignup };


