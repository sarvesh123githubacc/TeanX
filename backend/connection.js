import mongoose from "mongoose";

const connectMongo = async (url) => {
	mongoose
		.connect(url)
		.then(() => console.log("Connected to mongoDB"))
		.catch((err) => console.log("Mongo Error: ", err));
};

export default connectMongo;
