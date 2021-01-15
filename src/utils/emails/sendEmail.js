import { format, isValid } from "date-fns";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	process.env.EMAIL_OAUTH_ID,
	process.env.EMAIL_OAUTH_CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ "refresh_token": process.env.EMAIL_REFRESH_TOKEN });

const accessToken = oauth2Client.getAccessToken();

/**
 * Send an email
 *
 * @param {string} to The email address to which to send the email
 * @param {object} options Options about the email
 * @param {string} options.subject The subject of the email
 * @param {string} options.template The name of the template file (without file extension) to be used to build the email body
 * @param {object} options.context The data used to fill in the template
 * @returns {Promise} the promise to send the email
 */
const sendEmail = (to, { subject, template, context }) => {
	const transporter = nodemailer.createTransport({
		"service": "gmail",
		"auth": {
			"type": "OAuth2",
			"clientId": process.env.EMAIL_OAUTH_ID,
			"clientSecret": process.env.EMAIL_OAUTH_CLIENT_SECRET,
			"refreshToken": process.env.EMAIL_REFRESH_TOKEN,
			accessToken,
			"user": process.env.EMAIL_USER,
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
		context.date = format(context.date, "hh:mm - dd/mm/yyyy");
	}

	return transporter.sendMail({
		"from": `"PN Annual Leave" <${process.env.EMAIL_USER}@gmail.com>`,
		to,
		subject,
		template,
		"context": { ...context, "url": `${process.env.BACKEND_URL}` },
	});
};

export default sendEmail;
