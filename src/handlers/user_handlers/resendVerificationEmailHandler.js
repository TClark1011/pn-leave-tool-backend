import { log } from "../../middleware/loggingMiddleware";
import User from "../../models/User.model";
import sendVerificationEmail from "../../utils/emails/sendVerificationEmail";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";
import getErrorResponse from "../../utils/responses/getErrorResponse";

/**
 * Handle request to resend verification email
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const resendVerificationEmailHandler = async (req, res) => {
	const { employee_number } = req.params;

	const foundUser = await User.getFromEmployeeNumber(employee_number);

	console.log("(resendVerificationEmailHandler) foundUser: ", foundUser);

	if (!foundUser.verified) {
		sendVerificationEmail(foundUser)
			.then(() => {
				res.status(200).json(
					getSuccessResponse({
						"message": "Your verification email has been resent",
					})
				);
			})
			.catch((err) => {
				res
					.status(500)
					.json(getErrorResponse({ "attempting": "send a verification email" }));
				log(
					"There was an error while trying to resend a verification email: " +
						err,
					"error"
				);
			});
	} else {
		res
			.status(409)
			.json(getErrorResponse({ "fullMessage": "You are already verified" }));
	}
};

export default resendVerificationEmailHandler;
