import { differenceInMinutes, addHours, addYears } from "date-fns";
import User from "../models/User.model";
import Leave from "../models/Leave.model";
import { log } from "./loggingMiddleware";

/**
 * Deletes unverified accounts that have existed for longer than one hour
 */
const deleteExpiredUsers = async () => {
	log("Deleting unverified users", "cleanup");
	User.deleteMany({
		"verified": false,
		"date_created": { "$lte": addHours(Date.now(), -1) },
	})
		.then((result) => {
			log(`Deleted ${result.deletedCount} expired users`, "cleanup");
		})
		.catch((err) => {
			log(err, "error");
		});
};

/**
 * Delete leave requests with end dates at least 1 year ago
 */
const deleteOldLeave = async () => {
	log("Deleting old leave requests", "cleanup");
	Leave.deleteMany({
		"dates.end": {
			"$lte": addYears(Date.now(), -1),
		},
	})
		.then((result) => {
			log(`Deleted ${result.deletedCount} old leave requests`, "cleanup");
		})
		.catch((err) => {
			log(err, "error");
		});
};

var lastRan = addHours(Date.now(), -10);

/**
 * Call all cleanup tasks
 *
 * @param {object} req Request Object
 * @param {object} res Response object
 * @param {Function} next Function to pass request to next route handler
 */
export const cleanupMiddleware = (req, res, next) => {
	if (differenceInMinutes(Date.now(), lastRan) >= 60) {
		log("Running cleanup tasks", "cleanup");
		lastRan = Date.now();
		deleteExpiredUsers();
		deleteOldLeave();
	}
	next();
};

export default cleanupMiddleware;
