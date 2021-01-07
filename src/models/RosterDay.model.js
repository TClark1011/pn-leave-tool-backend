import mongoose, { Schema, model } from "mongoose";
import mongooseConnect from "../utils/mongooseConnect";

mongooseConnect(mongoose, "Roster Day");

const daySchema = new Schema({
	"date": { "type": Date, "required": true },
	"absentDrivers": { "type": Number, "default": 0 },
	"depot": { "type": Schema.Types.ObjectId, "ref": "depot", "required": true },
});

daySchema.pre("save", function () {
	this.date.setHours(0, 0, 0, 0);
});

const RosterDay = model("roster_day", daySchema);

/**
 * Adds an absent driver to a date
 *
 * @param {Date} date The date to which to add an absent driver
 */
RosterDay.addAbsentDriver = async (date) => {
	const dateCopy = new Date(date);
	const lower = new Date(dateCopy.setHours(0, 0, 0, 0));
	const upper = new Date(dateCopy.setHours(23, 59, 59, 59));
	const updateTarget = await RosterDay.findOneAndUpdate(
		{
			"date": {
				"$gte": lower,
				"$lte": upper,
			},
		},
		{ "$inc": { "absentDrivers": 1 } }
	);
	if (!updateTarget) {
		new RosterDay({ "date": date, "absentDrivers": 1 }).save();
	}
};

/**
 * Get the date record for provided date
 *
 * @param {Date} date The date to retrieve the record for
 * @param {Depot} depot The depot
 * @returns {RosterDay} The record for the provided date, if no record exists, returns a blank record for that date
 */
RosterDay.getDateRecord = async (date, depot) => {
	const dateCopy = new Date(date);
	const lower = new Date(dateCopy.setHours(0, 0, 0, 0));
	const upper = new Date(dateCopy.setHours(23, 59, 59, 59));
	const record = await RosterDay.findOne({
		"date": {
			"$gte": lower,
			"$lte": upper,
		},
		depot,
	});
	if (!record) {
		return new RosterDay({ "date": date, "absentDrivers": 0, depot });
	}
	return record;
};

export default RosterDay;
