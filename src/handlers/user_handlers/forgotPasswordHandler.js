import User from "../../models/User.model";
import crypto from "crypto";
import { addHours } from "date-fns";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";
import sendEmail from "../../utils/emails/sendEmail";

/**
 * Handle request to start the password reset process
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const forgotPasswordHandler = async (req, res) => {
	const { employee_number } = req.params;

	const foundUser = await User.getFromEmployeeNumber(employee_number);
	const key = crypto.randomBytes(16).toString("hex");
	foundUser.passwordReset.isResettingPassword = true;
	foundUser.passwordReset.passwordResetKey = key;
	foundUser.passwordReset.passwordResetKeyExpires = addHours(new Date(), 1);
	foundUser.save();

	sendEmail(foundUser.email, {
		"subject": "Forgot Password",
		"template": "forgotPassword",
		"context": {
			"name": foundUser.name,
			"link": `${process.env.FRONTEND_URL}/resetPassword/${key}`,
		},
		"from": "support",
	}).then(() => {
		res.status(200).json(
			getSuccessResponse({
				"message":
					"A message has been sent to the email address linked to your account. Follow the instructions in the message to reset your password.",
			})
		);
	});

	//TODO: Write messages
};

export default forgotPasswordHandler;
