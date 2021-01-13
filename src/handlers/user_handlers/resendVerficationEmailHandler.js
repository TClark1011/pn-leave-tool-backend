import { log } from "../../middleware/loggingMiddleware";
import User from "../../models/User.model";
import sendVerificationEmail from "../../utils/emails/sendVerificationEmail";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

/**
 * Handle request to resend verification email
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const resendVerificationEmailHandler = async (req, res) => {
	const { employee_number } = req.params;

	const foundUser = await User.getFromEmployeeNumber(employee_number);

	sendVerificationEmail(foundUser)
		.then(() => {
			res
				.status(200)
				.json(getSuccessResponse({ "message": "Your email has been resent" }));
		})
		.catch((err) => {
			res
				.status(500)
				.json(getSuccessResponse({ "attempting": "send a verification email" }));
			log(
				"There was an error while trying to resend a verification email: " +
					err,
				"error"
			);
		});
};

export default resendVerificationEmailHandler;
