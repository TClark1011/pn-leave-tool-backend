import { format } from "date-fns";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

/**
 * @param root0
 * @param root0.employee_number
 * @param root0.email
 * @param template.subject
 * @param template
 * @param to
 * @param action
 * @param template.template
 * @param template.context
 */
const sendEmail = (to, { subject, template, context }) => {
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

	if (context.date) {
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
