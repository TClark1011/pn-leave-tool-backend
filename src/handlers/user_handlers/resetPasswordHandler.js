import {
	defaultPasswordResetKey,
	defaultPasswordResetKeyExpires,
} from "../../constants/defaultValues";
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
		"passwordReset.isResettingPassword": true,
		"passwordReset.passwordResetKey": reset_key,
		"passwordReset.passwordResetKeyExpires": { "$gte": new Date() },
	});
	foundUser.password = await encryptPassword(password);
	foundUser.passwordReset.isResettingPassword = false;
	foundUser.passwordReset.passwordResetKey = defaultPasswordResetKey;
	foundUser.passwordReset.passwordResetKeyExpires = defaultPasswordResetKeyExpires;
	await foundUser.save();
	res
		.status(200)
		.json(getSuccessResponse({ "message": "Your password has been updated" }));
	//TODO: Write messages
};

export default resetPasswordHandler;
