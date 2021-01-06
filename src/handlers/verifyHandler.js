import jwt from "jsonwebtoken";
import User from "../models/User.model";
import getSuccessResponse from "../utils/responses/getSuccessResponse";

/**
 * @param req
 * @param res
 */
const verifyHandler = async (req, res) => {
	const foundUser = await User.getFromEmployeeNumber(
		jwt.verify(req.params.token, process.env.JWT_SECRET)
	);
	if (foundUser) {
		if (!foundUser.verified) {
			foundUser.verified = true;
			foundUser.save();
			res.redirect(process.env.FRONTEND_URL + "/login?verified");
			return;
		}
		res.status(400).send("You are already verified");
		return;
	}
	res.status(400).send("invalid token");
};

export default verifyHandler;
