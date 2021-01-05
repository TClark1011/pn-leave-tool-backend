import { Router } from "express";
import loginHandler from "../handlers/loginHandler";

const UserRouter = Router();

//# Login Attempt
UserRouter.post("/login", loginHandler);

export default UserRouter;
