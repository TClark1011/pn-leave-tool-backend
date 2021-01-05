import nodemailer from "nodemailer";

/**
 * @param root0
 * @param root0.employee_number
 * @param root0.email
 * @param template
 */
const sendEmail = () => {
	const transporter = nodemailer.createTransport({
		"service": "gmail",
		"auth": {
			"user": process.env.EMAIL_USER,
			"pass": process.env.EMAIL_PASS,
		},
	});

	return transporter.sendMail({
		"from": `"PN Annual Leave" <${process.env.EMAIL_USER}@gmail.com>`,
		"to": "mikhaela82@creationuq.com",
		"subject": "Account Verification",
	});
};

export default sendEmail;
