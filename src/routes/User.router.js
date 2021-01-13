import { Router } from "express";
import loginHandler from "../handlers/user_handlers/loginHandler";
import registerHandler from "../handlers/user_handlers/registerHandler";
import verifyHandler from "../handlers/user_handlers/verifyHandler";
import validationMiddleware from "../middleware/validationMiddleware";
import User from "../models/User.model";
import loginVal from "../validation/schemas/loginVal";
import registerVal from "../validation/schemas/registerVal";
import updateDocument from "../handlers/document_controls/updateDocument";
import getAuthMiddleware from "../middleware/authMiddleware";
import resendVerificationEmailHandler from "../utils/emails/resendVerificationEmailHandler";
import forgotPasswordHandler from "../handlers/user_handlers/forgotPasswordHandler";
import resetPasswordHandler from "../handlers/user_handlers/resetPasswordHandler";

const UserRouter = Router();

//# User Login
UserRouter.post("/login", validationMiddleware(loginVal));
UserRouter.post("/login", loginHandler);

//# User Registration
UserRouter.post("/register", validationMiddleware(registerVal));
UserRouter.post("/register", registerHandler);

UserRouter.post(
	"/resendVerification/:employee_number",
	resendVerificationEmailHandler
);

UserRouter.get("/verify/:token", verifyHandler);

UserRouter.use("/update", getAuthMiddleware("login"));
//# User updates information
UserRouter.put(
	"/update",
	updateDocument(User, {
		"successMessage": "Your new details have been saved",
		"errorMessage":
			"An error occurred while attempting to update your details, please try again later",
	})
);

UserRouter.post("/forgotPassword/:employee_number", forgotPasswordHandler);

UserRouter.post("/resetPassword/:reset_key", resetPasswordHandler);

export default UserRouter;
