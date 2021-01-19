import { log, stringifyObject } from "../../middleware/loggingMiddleware";
import getToken from "../getToken";
import sendEmail from "./sendEmail";

/**
 * Send verification email to user
 *
 * @param {User} userData Raw user document data pulled straight from mongoose without modification
 * @returns {Promise} calls 'sendEmail'
 */
const sendVerificationEmail = (userData) => {
	const { date, name, employee_number } = userData;
	log("Sending verification email to user: " + stringifyObject(userData));
	const emailOptions = {
		"template": "verification",
		"subject": "Email Verification",
		"context": {
			name,
			employee_number,
			"date": new Date(date),
			"token": getToken(userData.employee_number),
			"url": process.env.FRONTEND_URL,
		},
		"from": "registration",
	};

	log(
		"Sending verification email with the options: " +
			stringifyObject(emailOptions)
	);

	return sendEmail(userData.email, emailOptions);
};

export default sendVerificationEmail;
