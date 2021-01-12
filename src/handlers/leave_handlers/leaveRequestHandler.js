import { addDays } from "date-fns";
import { requiredWorkforce } from "../../constants/systemParameters";
import Depot from "../../models/Depot.model";
import Leave from "../../models/Leave.model";
import RosterDay from "../../models/RosterDay.model";
import User from "../../models/User.model";
import getErrorResponse from "../../utils/responses/getErrorResponse";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

/**
 * Handle leave request
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 */
const leaveRequestHandler = async (req, res) => {
	const { dates, "user": userEmployeeNumber } = req.body;

	const fullUser = await User.getFromEmployeeNumber(userEmployeeNumber);
	const depotId = fullUser.depot._id;
	const fullDepot = await Depot.findOne({ "_id": depotId });

	const storedUpdates = [];
	//? Will hold 'RosterDay' documents that have their absent drivers field updated to account for requesting employee being absent

	const invalidDays = [];
	//? Stores all days that cannot handle another

	//# Loop over all days that the requested leave will be part of
	//# Get their 'RosterDay' documents and check if those days will still be above the required workforce with additional absent driver
	//# If A 'RosterDay' cannot have another absent driver, the loop breaks and the leave request is deemed invalid
	for (
		let date = new Date(dates.start);
		date <= new Date(dates.end);
		date = addDays(date, 1)
	) {
		const storedDay = await RosterDay.getDateRecord(date, depotId);
		storedDay.absentDrivers += 1;
		const remainingDrivers = fullDepot.drivers - storedDay.absentDrivers;
		remainingDrivers / fullDepot.drivers < requiredWorkforce
			? invalidDays.push(storedDay)
			: storedUpdates.push(storedDay);
		//? Push 'storedDay' to 'storedUpdates' if valid, otherwise push it to 'invalidDays'
	}

	if (invalidDays.length < 1) {
		//? If there are no invalid days, leave request is valid and is saved to database
		await new Leave({
			"dates": dates,
			"user": fullUser.employee_number,
			"status": 1,
			"depot": depotId,
		}).save();
		for (const leaveDay of storedUpdates) {
			await leaveDay.save();
		}
		res.status(200).json(
			getSuccessResponse({
				"message": "Your request for leave has been estimated to be valid.",
			})
		);
		return;
	}

	res.status(406).json(
		getErrorResponse({
			"fullMessage":
				"The leave tool has estimated that your requested leave will not be approved due to the following dates being unavailable: @break@ You can return to the leave screen and change the dates and try again.",
			"extraData": invalidDays,
		})
	);
	//TODO: Write messages
};

export default leaveRequestHandler;
