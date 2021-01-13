import { format, toDate } from "date-fns";
import getToken from "../getToken";
import sendEmail from "./sendEmail";

/**
 * Send verification email to user
 *
 * @param {User} userData users data
 * @returns {Promise} calls 'sendEmail'
 */
const sendVerificationEmail = (userData) => {
	const { date, name, employee_number } = userData;
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
