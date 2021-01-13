import User from "../../models/User.model";
import encryptPassword from "../../utils/encryptPassword";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

/**
 * Update a users password
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const resetPasswordHandler = async (req, res) => {
	const { reset_key } = req.params;
	const { password } = req.body;

	const foundUser = await User.findOne({
		"passwordReset": {
			"isResettingPassword": true,
			"passwordResetKey": reset_key,
			// "passwordResetKeyExpires": { "$gte": new Date() },
		},
	});
	foundUser.password = encryptPassword(password);
	foundUser.passwordReset.isResettingPassword = false;
	foundUser.passwordReset.passwordResetKey = "";
	foundUser.passwordReset.passwordResetKeyExpires = new Date();
	res
		.status(200)
		.json(getSuccessResponse({ "message": "Your password has been updated" }));
	//TODO: Write messages
};

export default resetPasswordHandler;
