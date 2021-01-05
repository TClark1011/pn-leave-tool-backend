import { Router } from "express";
import loginHandler from "../handlers/loginHandler";
import registerHandler from "../handlers/registerHandler";

const UserRouter = Router();

//# User Login
UserRouter.post("/login", loginHandler);

//# User Registration
UserRouter.post("/register", registerHandler);

export default UserRouter;
