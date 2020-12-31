/**
 * Send an error response to an HTTP request with a structured format
 * @param  {Express.Response} [res] - The express http response object
 * @param {Object} [options] - Options regarding the response
 * @param {string} [options.attempting] - What action was being attempted when the
 * error occurred? eg; "delete an item", "fetch documents", etc.
 * @param {string} [options.attemptingPrefix="There was an error while trying to "] - Text
 * that will be prefixed to the 'attempting' parameter.
 * @param {string} [options.fullMessage="There was an error"] - The full message string.
 * If 'attempting' is not provided, this is used instead. If a value for 'attempting' is
 * provided then the returned message will be the 'attempting' value prefixed with the value of
 * 'attemptingPrefix'
 * @param {number} [options.status=500] - The http status code to be used in the response
 * @param {Error} [options.rawError] - The raw error object. If provided it will be entered into its
 * own field in the response, otherwise it will be left out.
 */
export default (
	res,
	{
		attempting,
		attemptingPrefix = "There was an error while trying to ",
		fullMessage = "There was an error",
		status = 500,
		rawError,
	},
) => {
	const response = {
		message:
			fullMessage && !attempting ? fullMessage : attemptingPrefix + attempting,
	};
	if (rawError) {
		response.rawError = rawError;
	}
	return res.status(status).json(response);
};
