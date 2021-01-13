import { genericErrorMsg } from "../constants/messages";
import getErrorResponse from "../utils/responses/getErrorResponse";
import { log } from "./loggingMiddleware";

/**
 * Log errors to console
 *
 * @param {Error} err The Error object that triggered the error response
 * @param {object} req Request Object
 * @param {object} res Response object
 * @param {Function} next Function to pass request to next route handler
 */
// eslint-disable-next-line no-unused-vars
export const logErrors = (err, req, res, next) => {
	log(err.stack, "error");
	next(err);
};

/**
 * Send error response to user
 *
 * @param {Error} err The Error object that triggered the error response
 * @param {object} req Request Object
 * @param {object} res Response object
 * @param {Function} next Function to pass request to next route handler
 */
// eslint-disable-next-line no-unused-vars
export const sendErrorResponse = (err, req, res, next) => {
	const response = getErrorResponse({
		"fullMessage": genericErrorMsg,
	});
	if (err.extraData) {
		response.extraData = err.extraData;
	}
	res.status(err?.status || 500).json(response);
};
