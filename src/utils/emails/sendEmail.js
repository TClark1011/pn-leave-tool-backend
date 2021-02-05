import { format, isValid } from "date-fns";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { google } from "googleapis";
import { log } from "../../middleware/loggingMiddleware";
import { stringifyObject } from "../../middleware/loggingMiddleware";
import {
	BACKEND_URL,
	EMAIL_ADDRESS,
	EMAIL_OAUTH_CLIENT_SECRET,
	EMAIL_OAUTH_ID,
	EMAIL_REFRESH_TOKEN,
	EMAIL_USER,
	SUPPORT_EMAIL,
} from "../../constants/env";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	EMAIL_OAUTH_ID,
	EMAIL_OAUTH_CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ "refresh_token": EMAIL_REFRESH_TOKEN });
//? Redo authentication setup following this: https://developers.google.com/gmail/api/quickstart/nodejs

const accessToken = oauth2Client.getAccessToken();

/**
 * Valid values that can be passed to the "from" parameter in the "sendEmail" function
 */
const validFromValues = ["registration", "support"];

/**
 * Send an email
 *
 * @param {string} to The email address to which to send the email
 * @param {object} options Options about the email
 * @param {string} options.subject The subject of the email
 * @param {string} options.template The name of the template file (without file extension) to be used to build the email body
 * @param {object} options.context The data used to fill in the template
 * @param {string} options.from Ther username the email should come from
 * @returns {Promise} the promise to send the email
 */
const sendEmail = (to, { subject, template, context, from }) => {
	if (from && !validFromValues.includes(from)) {
		throw TypeError(
			`'from' value must be one of the following: ${stringifyObject(
				validFromValues
			)}`
		);
	}
	const transporter = nodemailer.createTransport({
		"service": "gmail",
		"auth": {
			"type": "OAuth2",
			"clientId": EMAIL_OAUTH_ID,
			"clientSecret": EMAIL_OAUTH_CLIENT_SECRET,
			"refreshToken": EMAIL_REFRESH_TOKEN,
			accessToken,
			"user": EMAIL_USER,
		},
	});

	transporter.use(
		"compile",
		hbs({
			"viewEngine": {
				"layoutsDir": "./email/layouts",
			},
			"viewPath": "./email/templates",
		})
	);

	if (context.date && isValid(context.date)) {
		context.date = format(context.date, "hh:mm - dd/MM/yyyy");
	}

	const fromEmail = from ? `${from}@pnleave.com` : EMAIL_ADDRESS;

	log(`Sending email from ${fromEmail} to ${to}`);

	return transporter.sendMail({
		"from": `"PN Leave Tool" <${fromEmail}>`,
		to,
		subject,
		template,
		"context": {
			...context,
			"url": `${BACKEND_URL}`,
			"supportEmail": SUPPORT_EMAIL,
		},
	});
};

export default sendEmail;
