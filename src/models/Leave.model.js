import mongoose, { Schema, model } from "mongoose";
import mongooseConnect from "../utils/mongooseConnect";
import User from "./User.model";
import { addDays } from "date-fns";

import { leaveLength, leaveStartMinOffset } from "pn-leave-tool-common";

mongooseConnect(mongoose, "Leave");

/**
 * Get the earliest possible date that new leave can start
 *
 * @returns {Date} The earliest date that new leave can start
 */
const getMinStartDate = () => addDays(new Date(), leaveStartMinOffset);

/**
 * Get the earliest possible end date that new leave can start
 *
 * @returns {Date} The earliest date that new leave can start
 */
const getMinEndDate = function () {
	return addDays(this.dates.start, leaveLength.min);
};

const getMaxEndDate = function () {
	return addDays(this.dates.start, leaveLength.max);
};

/**
 * Checks that provided employee number corresponds to an existing user
 *
 * @returns {boolean} Whether or not the provided employee number corresponds to an existing user
 */
const checkEmployeeNumber = async function () {
	return !!(await User.getFromEmployeeNumber(this.user));
};

const statusRangeMsg =
	"Request status must one of the following values: -1 (denied), 0(pending), 1(approved)";
const leaveSchema = new Schema({
	"dates": {
		"start": {
			"type": Date,
			"min": getMinStartDate,
		},
		"end": {
			"type": Date,
			"required": true,
			"min": getMinEndDate,
			"max": getMaxEndDate,
		},
	},
	"user": {
		"type": String,
		"required": true,
		"validate": {
			"validator": checkEmployeeNumber,
			"message": "Provided user ID is invalid",
		},
	},
	"status": {
		"type": Number,
		"required": true,
		"min": [-1, statusRangeMsg],
		"max": [1, statusRangeMsg],
		"get": Math.round,
		"set": Math.round,
	},
	"depot": { "type": mongoose.Schema.Types.ObjectId, "ref": "depot", "required": true },
	"submitted": { "type": Date, "default": Date.now() },
});

const Leave = model("leave_request", leaveSchema);

export default Leave;
