import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

/**
 * @param root0
 * @param root0.employee_number
 * @param root0.email
 * @param template
 * @param to
 * @param action
 */
const sendEmail = (to, action) => {
	const transporter = nodemailer.createTransport({
		"service": "gmail",
		"auth": {
			"user": process.env.EMAIL_USER,
			"pass": process.env.EMAIL_PASS,
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
	return transporter.sendMail({
		"from": `"PN Annual Leave" <${process.env.EMAIL_USER}@gmail.com>`,
		to,
		"subject": "Account Verification",
		"template": action,
	});
};

export default sendEmail;
