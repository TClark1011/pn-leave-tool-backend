import { Router } from "express";
import loginHandler from "../handlers/loginHandler";
import registerHandler from "../handlers/registerHandler";
import verifyHandler from "../handlers/verifyHandler";
import validationMiddleware from "../middleware/validationMiddleware";
import loginVal from "../validation/schemas/loginVal";
import registerVal from "../validation/schemas/registerVal";

const UserRouter = Router();

//# User Login
UserRouter.post("/login", validationMiddleware(loginVal));
UserRouter.post("/login", loginHandler);

//# User Registration
UserRouter.post("/register", validationMiddleware(registerVal));
UserRouter.post("/register", registerHandler);

UserRouter.get("/verify/:token", verifyHandler);

export default UserRouter;
