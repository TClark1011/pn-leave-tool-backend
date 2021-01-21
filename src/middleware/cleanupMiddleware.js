import { differenceInMinutes, addHours } from "date-fns";
import User from "../models/User.model";
import { log } from "./loggingMiddleware";

/**
 * Deletes unverified accounts that have existed for longer than one hour
 */
const deleteExpiredUsers = () => {
	log("Deleting unverified users", "cleanup");
	User.deleteMany({
		"verified": false,
		"date_created": { "$lte": addHours(Date.now(), -1) },
	}).then((result) => {
		log(`Deleted ${result.deletedCount} expired users`, "cleanup");
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
	}
	next();
};

export default cleanupMiddleware;
