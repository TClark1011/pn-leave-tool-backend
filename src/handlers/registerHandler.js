import sendEmail from "../utils/sendEmail";
import getErrorResponse from "../utils/responses/getErrorResponse";
import getSuccessResponse from "../utils/responses/getSuccessResponse";
import User from "../models/User.model";
import encryptPassword from "../utils/encryptPassword";
import getToken from "../utils/getToken";

/**
 * Handle user registration
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const registerHandler = async (req, res) => {
	const { employee_number, password } = req.body;
	const foundUser = await User.getFromEmployeeNumber(employee_number);
	if (foundUser) {
		if (foundUser.verified) {
			const errorSummary = `An account with the Employee Number '${employee_number}' already exists.`;
			const errorLongDescription =
				" If you are creator of that account you can enter your password and press 'login'. If you did not create that account, please contact ...";
			//TODO: Write messages
			res
				.status(401)
				.json(
					getErrorResponse({ "message": errorSummary + errorLongDescription })
				);
			return;
		}
		const updateFields = ["email", "phone", "leave", "first_name", "last_name"];
		for (let field of updateFields) {
			foundUser[field] = req.body[field];
		}
		foundUser.password = await encryptPassword(password);
		await foundUser.save();
		res
			.status(200)
			.json(getSuccessResponse({ "message": "do email verification" }));
		//TODO: Write messages
		return;
	}

	const userObj = req.body;
	delete userObj.confirm_password;
	delete userObj.confirm_employee_number;
	userObj.password = await encryptPassword(password);
	userObj.date = Date.now();

	if (!foundUser) {
		await new User(userObj).save();
	} else {
		userObj.save();
	}

	sendEmail(req.body.email, {
		"template": "verification",
		"subject": "Email Verification",
		"context": {
			...req.body,
			"token": getToken(req.body.employee_number),
		},
	})
		.then(() =>
			res.status(200).json(
				getSuccessResponse({
					"message": "Please check your email for verification",
				})
			)
		)
		.catch((err) =>
			res.status(500).json(
				getErrorResponse({
					"attempting": "process your registration",
					"extraData": err,
				})
			)
		);
	//TODO: Write messages
};

export default registerHandler;