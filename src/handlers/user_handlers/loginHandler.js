import User from "../../models/User.model";
import bcrypt from "bcrypt";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";
import getToken from "../../utils/getToken";
import getError from "../../utils/getError";

/**
 * Handle user login.
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const loginHandler = async (req, res) => {
	console.log("(loginHandler) Received request to login");
	const { employee_number, password } = req.body;

	const foundUser = await User.getFromEmployeeNumber(employee_number);

	const userIsAuthenticated =
		foundUser && (await bcrypt.compare(password, foundUser.password));

	if (!userIsAuthenticated) {
		//# If no user object was found (incorrect employee number) or password was incorrect
		throw getError("Incorrect Employee Number or Password", 401);
	} else if (!foundUser.verified) {
		//# Credentials are correct but user has not completed email verification
		throw getError(
			"You must verify your email address before you can login. Check your email inbox and follow the instructions in the verification email.",
			403
		);
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
