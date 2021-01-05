/**
 * @param root0
 * @param root0.employee_number
 * @param root0.email
 */
const sendEmail = async ({ employee_number, email, ...user }) => {
	const transporter = nodemailer.createTransport({
		"service": "gmail",
		"auth": {
			"user": process.env.EMAIL_USER,
			"pass": process.env.EMAIL_PASS,
		},
	});

	const token = jwt.sign(employee_number, process.env.JWT_SECRET);

	const msgFields = {
		...user,
		"link": `http://${process.env.BACKEND_URL}/api/users/verify/${token}`,
	};

	var htmlStream = fs.createReadStream("backend/html/verificationEmail.html");

	for (let i = 0; i < Object.keys(msgFields).length; i++) {
		const regex = new RegExp("{{" + Object.keys(msgFields)[i] + "}}", "g");
		htmlStream = htmlStream.pipe(
			streamReplace(regex, Object.values(msgFields)[i])
		);
	}

	return transporter.sendMail({
		"from": `"PN Annual Leave" <${process.env.EMAIL_USER}@gmail.com>`,
		"to": email,
		"subject": "Account Verification",
		"html": htmlStream,
	});
};

export default sendEmail;
