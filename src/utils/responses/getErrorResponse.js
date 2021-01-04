import getRequestResponse from "./getRequestResponse";

/**
 * Send an error response to an HTTP request with a structured format
 *
 * @param {object} options Options regarding the response
 * @param {string} [options.attempting] What action was being attempted when the
 * error occurred? eg; "delete an item", "fetch documents", etc.
 * @param {string} [options.attemptingPrefix="There was an error while trying to "] Text
 * that will be prefixed to the 'attempting' parameter.
 * @param {string} [options.fullMessage="There was an error"] The full message string.
 * If 'attempting' is not provided, this is used instead. If a value for 'attempting' is
 * provided then the returned message will be the 'attempting' value prefixed with the value of
 * 'attemptingPrefix'
 * @param {Error} [options.extraData] Extra data that will be included in the response.
 * @param {string} [options.redirect] url to redirect user to
 * @returns {object} Error response to return to user
 */
const getErrorResponse = ({
	attempting = null,
	attemptingPrefix = "There was an error while trying to ",
	fullMessage = "There was an error",
	extraData = null,
	redirect = null,
}) => {
	return getRequestResponse("negative", {
		"message":
			fullMessage && !attempting ? fullMessage : attemptingPrefix + attempting,
		extraData,
		redirect,
	});
};

export default getErrorResponse;
