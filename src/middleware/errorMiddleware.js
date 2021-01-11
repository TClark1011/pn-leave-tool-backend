import getErrorResponse from "../utils/responses/getErrorResponse";

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
	console.log("There was an error: ", err);
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
		"fullMessage": err.message,
	});
	if (err.extraData) {
		response.extraData = err.extraData;
	}
	res.status(err.status).json(response);
};
