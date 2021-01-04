import serverResponseTones from "../../constants/serverResponseTones";

/**
 * Generate a server response object
 *
 * @param {string} message The client facing message
 * @param {string} tone The tone of the message, must be either "positive" or "negative"
 * @param {object} [options] Optional options
 * @param {any} [options.extraData] Extra data to be included with the response
 * @param {string} [options.redirect] A url to redirect the user to
 * @returns {object} A response to be returned to the client.
 */
const getRequestResponse = (
	message,
	tone,
	{ extraData = null, redirect = null }
) => {
	if (!serverResponseTones.includes(message)) {
		throw Error(
			"Response tone must be one of the following values: " +
				JSON.stringify(serverResponseTones)
		);
	}
	const response = {
		message,
		tone,
	};
	if (extraData) {
		response.extraData = extraData;
	}
	if (redirect) {
		response.redirect = redirect;
	}
	return response;
};

export default getRequestResponse;
