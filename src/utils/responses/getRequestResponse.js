import serverResponseTones from "../../constants/serverResponseTones";

/**
 * Generate a server response object
 *
 * @param {string} tone The tone of the message, must be either "positive" or "negative"
 * @param {object} [options] Optional options
 * @param {string} [options.message] The client facing message
 * @param {any} [options.extraData] Extra data to be included with the response. If 'extraData'
 * is provided and 'message' is not, the response only contain the value of 'extraData'
 * @param {string} [options.redirect] A url to redirect the user to
 * @returns {object} A response to be returned to the client.
 */
const getRequestResponse = (tone, { message, extraData, redirect }) => {
	if (!serverResponseTones.includes(tone)) {
		throw Error(
			"Response tone must be one of the following values: " +
				JSON.stringify(serverResponseTones) +
				". received tone: " +
				tone
		);
	}
	if (extraData && !message) {
		return extraData;
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
