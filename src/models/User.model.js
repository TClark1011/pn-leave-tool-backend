import mongoose, { Schema, model } from "mongoose";
import {
	defaultPasswordResetKey,
	defaultPasswordResetKeyExpires,
} from "../constants/defaultValues";
import mongooseConnect from "../utils/mongooseConnect";
import { emailRegex } from "pn-leave-tool-common";
import { VALIDATE_EMAIL } from "../constants/env";
import { log, stringifyObject } from "../middleware/loggingMiddleware";

mongooseConnect(mongoose, "User");

const enLengthMessage = "employee_number must be 6 characters long";
const userSchema = new Schema({
	"employee_number": {
		"type": String, //?String so as to support 0 starting numbers
		"required": true,
		"maxlength": [6, enLengthMessage],
		"minlength": [6, enLengthMessage],
		"unique": true,
	},
	"password": { "type": String, "required": true },
	"name": { "type": String, "required": true },
	"depot": { "type": mongoose.Schema.Types.ObjectId, "ref": "depot", "required": true },
	"email": {
		"type": String,
		"required": true,
		"validate": {
			"validator": function () {
				//? Has to be function and not lambda due to use of 'this'
				return VALIDATE_EMAIL ? emailRegex.test(this.email) : true;
			},
			"message": "invalid email address",
		},
	},
	"date_created": { "type": Date, "default": Date.now() },
	"verified": { "type": Boolean, "default": false },
	"passwordReset": {
		"isResettingPassword": { "type": Boolean, "default": false },
		"passwordResetKey": { "type": String, "default": defaultPasswordResetKey },
		"passwordResetKeyExpires": {
			"type": Date,
			"default": defaultPasswordResetKeyExpires,
		},
	},
});

/**
 * Returns a sanitised copy of an instance of 'User'
 *
 * @returns {Document<User>} Original instance with  with 'password' and '__v' fields removed
 */
userSchema.methods.getSanitised = function () {
	const copy = JSON.parse(JSON.stringify(this));
	delete copy.password;
	delete copy.__v;
	return copy;
};

/**
 * Forcefully set special fields such as 'verified' or
 * 'date_created' upon creation to prevent them from
 * being set manually by clients.
 */
userSchema.pre("save", () => {
	if (this.isNew) {
		this.verified = false;
		this.date_created = Date.now();
		this.passwordReset = {
			"isResettingPassword": false,
			"passwordResetKey": defaultPasswordResetKey,
			"passwordResetKeyExpires": defaultPasswordResetKeyExpires,
		};
	}
});

const User = model("User", userSchema);

/**
 * Fetches User document with the provided employee_number
 *
 * @param {string} employee_number The employee number of the user which
 * you want to retrieve the information of.
 * @returns {Document<User>} The corresponding user document
 */
User.getFromEmployeeNumber = (employee_number) => {
	return User.findOne({ employee_number }).populate("depot", "name");
};

export default User;
