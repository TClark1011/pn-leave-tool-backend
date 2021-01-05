import User from "../models/User.model";
import getErrorResponse from "../utils/responses/getErrorResponse";
import loginVal from "../validation/schemas/loginVal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @param req
 * @param res
 */
const loginHandler = async (req, res) => {
	try {
		await loginVal.validate(req.body);
	} catch (err) {
		res.status(400).json(
			getErrorResponse({
				"fullMessage": "Bad request, please reload the page and try again",
			})
		);
	}

	const { employee_number, password } = req.body;

	const foundUser = await User.getFromEmployeeNumber(employee_number);

	const userIsAuthenticated =
		foundUser && (await bcrypt.compare(password, foundUser.password));

	if (!userIsAuthenticated) {
		//# If no user object was found (incorrect employee number) or password was incorrect
		res.status(401).json(
			getErrorResponse({
				"fullMessage": "Incorrect Employee Number or Password",
			})
		);
		return;
	} else if (!foundUser.verified) {
		//# Credentials are correct but user has not completed email verification
		res.status(401).json(
			getErrorResponse({
				"fullMessage":
					"You must verify your email address before you can login. Check your email inbox and follow the instructions in the verification email.",
			})
		);
		return;
	}

	res.status(200).json({
		...foundUser.getSanitised(),
		"token": jwt.sign(foundUser.employee_number, process.env.JWT_SECRET),
	});
};

export default loginHandler;
