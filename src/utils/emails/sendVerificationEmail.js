import { log } from "../../middleware/loggingMiddleware";
import getToken from "../getToken";
import sendEmail from "./sendEmail";

/**
 * Send verification email to user
 *
 * @param {User} userData users data
 * @returns {Promise} calls 'sendEmail'
 */
const sendVerificationEmail = (userData) =>
	sendEmail(userData.email, {
		"template": "verification",
		"subject": "Email Verification",
		"context": {
			...userData,
			"token": getToken(userData.employee_number),
			"url": process.env.FRONTEND_URL,
		},
	});

export default sendVerificationEmail;
