import mongoose, { Schema, model } from "mongoose";
import mongooseConnect from "../utils/mongooseConnect";
import phoneRegex from "../validation/regex/phoneRegex";
import emailRegex from "../validation/regex/emailRegex";

mongooseConnect(mongoose, "User");

const enLengthMessage = "employee_number must be 6 characters long";
const userSchema = new Schema({
	"employee_number": {
		"type": String, //?String so as to support 0 starting numbers
		"required": true,
		"maxlength": [6, enLengthMessage],
		"minlength": [6, enLengthMessage],
	},
	"password": { "type": String, "required": true, "minLength": 6, "maxLength": 24 },
	"name": { "type": String, "required": true },
	"depot": { "type": mongoose.Schema.Types.ObjectId, "ref": "depot", "required": true },
	"email": {
		"type": String,
		"required": true,
		"validate": {
			"validator": function () {
				//? Has to be function and not lambda due to use of 'this'
				return emailRegex.test(this.email);
			},
			"message": "invalid email address",
		},
	},
	"phone": {
		"type": String,
		"required": false,
		"validate": {
			"validator": function () {
				return phoneRegex.test(this.phone);
			},
			"message": "phone number invalid",
		},
	},
	//phone field is not currently in use
	"date_created": { "type": Date, "default": Date.now() },
	"verified": { "type": Boolean, "default": false },
});

const User = model("User", userSchema);

/**
 * Fetches User document with the provided employee_number
 *
 * @param {string} employee_number The employee number of the user which
 * you want to retrieve the information of.
 * @returns {Document<User>} The corresponding user document
 */
User.getFromEmployeeNumber = async (employee_number) => {
	return await User.findOne({ employee_number }).populate("depot", "name");
};

export default User;