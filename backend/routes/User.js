import { userLogin, userSignup } from "../controllers/auth.js";
import { Router } from "express";
import userValidation from "../middleware/validate.js";
import { deleteUserById, getAllUsers, getUserById, updateUserData } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);

// userRouter.get("/:id", userValidation, getUserById);
userRouter.delete("/:id", userValidation, deleteUserById);
// userRouter.get("/", userValidation, getAllUsers);
userRouter.get("/", userValidation, getUserById);
userRouter.put("/", userValidation, updateUserData);

export default userRouter;