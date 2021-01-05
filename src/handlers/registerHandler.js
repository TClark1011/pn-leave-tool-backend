import sendEmail from "../utils/sendEmail";

/**
 * Handle user registration
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const registerHandler = (req, res) => {
	sendEmail("nalados492@nonicamy.com", "verification")
		.then(() => res.status(200).send("email sent"))
		.catch((err) => {
			console.log("(fetchAllDocuments) error sending email: ", err);
			res.status(500).json(err);
		});
};

export default registerHandler;
