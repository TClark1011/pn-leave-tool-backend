import getToken from "../getToken";
import sendEmail from "./sendEmail";

/**
 * Send verification email to user
 *
 * @param {User} userData Raw user document data pulled straight from mongoose without modification
 * @returns {Promise} calls 'sendEmail'
 */
const sendVerificationEmail = (userData) => {
	const { date_created, name, employee_number } = userData;
	const date = date_created;
	return sendEmail(userData.email, {
		"template": "verification",
		"subject": "Email Verification",
		"context": {
			name,
			employee_number,
			"date": new Date(date),
			"token": getToken(userData.employee_number),
			"url": process.env.FRONTEND_URL,
		},
	});
};

export default sendVerificationEmail;
