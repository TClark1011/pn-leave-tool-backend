import { Router } from "express";
import loginHandler from "../handlers/loginHandler";
import registerHandler from "../handlers/registerHandler";
import verifyHandler from "../handlers/verifyHandler";
import validationMiddleware from "../middleware/validationMiddleware";
import User from "../models/User.model";
import loginVal from "../validation/schemas/loginVal";
import registerVal from "../validation/schemas/registerVal";
import updateDocument from "../handlers/document_controls/updateDocument";
import getAuthMiddleware from "../middleware/authMiddleware";

const UserRouter = Router();

//# User Login
UserRouter.post("/login", validationMiddleware(loginVal));
UserRouter.post("/login", loginHandler);

//# User Registration
UserRouter.post("/register", validationMiddleware(registerVal));
UserRouter.post("/register", registerHandler);

UserRouter.get("/verify/:token", verifyHandler);

UserRouter.use("/", getAuthMiddleware("login"));

UserRouter.put("/update", updateDocument(User));

export default UserRouter;
