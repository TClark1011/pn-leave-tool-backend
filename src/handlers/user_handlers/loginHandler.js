import User from "../../models/User.model";
import bcrypt from "bcrypt";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";
import getToken from "../../utils/getToken";
import getErrorResponse from "../../utils/responses/getErrorResponse";
import { log } from "../../middleware/loggingMiddleware";

/**
 * Handle user login.
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const loginHandler = async (req, res) => {
	const { employee_number, password } = req.body;

	const foundUser = await User.getFromEmployeeNumber(employee_number);

	const passwordMatch =
		foundUser?.password && (await bcrypt.compare(password, foundUser.password));
	const userIsAuthenticated = foundUser && passwordMatch;

	if (!userIsAuthenticated) {
		//# If no user object was found (incorrect employee number) or password was incorrect
		if (foundUser && !passwordMatch) {
			log("Failed log in attempt due to incorrect password", "warn");
		}
		res.status(401).json(
			getErrorResponse({
				"fullMessage": "Incorrect employee number or password",
			})
		);
		return;
	} else if (!foundUser.verified) {
		//# Credentials are correct but user has not completed email verification
		log("Unverified user attempted to log in", "warn");
		res.status(403).json(
			getErrorResponse({
				"fullMessage":
					"You must verify your email address before you can login. Check your email inbox and follow the instructions in the verification email.",
			})
		);
		return;
	}

	res.status(200).json(
		getSuccessResponse({
			"extraData": {
				...foundUser.getSanitised(),
				"token": getToken(foundUser.employee_number),
			},
		})
	);
};

export default loginHandler;
