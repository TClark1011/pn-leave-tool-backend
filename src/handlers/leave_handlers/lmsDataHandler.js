import { format, parse, startOfToday } from "date-fns";
import RosterDay from "../../models/RosterDay.model";
import getError from "../../utils/getError";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

/**
 * Handle lms data update
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const lmsDataHandler = async (req, res) => {
	const data = req.body;
	const result = {};

	for (let i = 1; i < data.length; i++) {
		const row = data[i];
		for (let x = 1; x < Object.keys(row).length; x++) {
			const date = Object.keys(row)[x];
			const isOff = Number(row[date] !== "");
			result[date] = (result[date] || 0) + isOff;
		}
	}

	for (let i = 0; i < Object.keys(result).length; i++) {
		const rawDate = Object.keys(result)[i];
		const offDrivers = result[rawDate];

		const parsedDate = parse(rawDate, "d/M/yyyy", startOfToday());
		const formattedDateStr = format(parsedDate, "MM/dd/yyy");

		try {
			const dayObject = await RosterDay.getDateRecord(formattedDateStr);
			dayObject.absentDrivers = offDrivers;
			await dayObject.save();
		} catch (err) {
			throw getError(
				"There was an error processing leave data. Please try entering the data again, making sure no alterations have been made. if the problem persists send an email to 'Thomas_Clark@pacificnational.com.au'.",
				401
			);
		}
	}

	res
		.status(200)
		.json(
			getSuccessResponse({
				"message": "The LMS data has been processed successfully",
			})
		);
};

export default lmsDataHandler;
