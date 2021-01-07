import mongoose, { Schema, model } from "mongoose";
import mongooseConnect from "../utility/mongooseConnect";
import User from "./User.model";
import { addDays, subDays } from "date-fns/esm";
import {
	leaveStartMinOffset,
	leaveDeleteParameters,
} from "../constants/systemParameters";

mongooseConnect(mongoose, "leave");

/**
 * Get the earliest possible date that new leave can start
 *
 * @returns {Date} The earliest date that new leave can start
 */
const getMinDate = () => addDays(new Date(), leaveStartMinOffset);

/**
 * Checks that provided employee number corresponds to an existing user
 *
 * @returns {boolean} Whether or not the provided employee number corresponds to an existing user
 */
const checkEmployeeNumber = () =>
	User.getFromEmployeeNumber(this.user) ? true : false;

const statusRangeMsg =
	"Request status must one of the following values: -1 (denied), 0(pending), 1(approved)";
const leaveSchema = new Schema({
	"dates": {
		"start": {
			"type": Date,
			"min": getMinDate,
		},
		"end": {
			"type": Date,
			"required": true,
			"min": this.start,
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

leaveSchema.pre("find", async () => {
	console.log("Deleting old leave request items...");
	await Leave.deleteMany({
		"status": -1,
		"submitted": { "$lt": subDays(new Date(), leaveDeleteParameters.denied) },
	})
		.then((result) => {
			console.log(
				`${result.deletedCount} old denied leave requests were deleted`
			);
		})
		.catch((error) => {
			console.log(
				"There was an error while deleting old denied leave requests: ",
				error
			);
		});

	await Leave.deleteMany({
		"status": 1,
		"dates.end": { "$lt": subDays(new Date(), leaveDeleteParameters.allowed) },
	})
		.then((result) => {
			console.log(
				`${result.deletedCount} old allowed leave requests were deleted`
			);
		})
		.catch((error) => {
			console.log(
				"There was an error while deleting old allowed leave requests: ",
				error
			);
		});
});

const Leave = model("leave", leaveSchema);

export default Leave;
