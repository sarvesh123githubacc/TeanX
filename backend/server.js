import express from "express";
import connectMongo from "./connection.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/User.js";
import cors from "cors";

const app = express();
const port = 3000;


connectMongo("mongodb://127.0.0.1:27017/fosshack");

app.use(
	cors({
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);



app.listen(3000,()=>{
    console.log("listening on the port 3000")  
})

app.get("/gg",(req,res)=>{
    res.json("hi there");
});