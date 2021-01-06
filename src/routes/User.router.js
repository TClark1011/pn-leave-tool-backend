import { Router } from "express";
import loginHandler from "../handlers/loginHandler";
import registerHandler from "../handlers/registerHandler";
import verifyHandler from "../handlers/verifyHandler";

const UserRouter = Router();

//# User Login
UserRouter.post("/login", loginHandler);

//# User Registration
UserRouter.post("/register", registerHandler);

UserRouter.get("/verify/:token", verifyHandler);

export default UserRouter;
