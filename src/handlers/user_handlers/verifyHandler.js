import User from "../../models/User.model";
import decodeToken from "../../utils/decodeToken";

/**
 * Handle user verifying their email address.
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const verifyHandler = async (req, res) => {
	const foundUser = await User.getFromEmployeeNumber(
		decodeToken(req.params.token)
	);
	if (foundUser) {
		if (!foundUser.verified) {
			foundUser.verified = true;
			foundUser.save();
		}
		res.status(200).redirect(process.env.FRONTEND_URL + "/login?verified");
		return;
	}
	res.redirect(process.env.FRONTEND_URL + "/login?redir");
};

export default verifyHandler;
