import getRequestResponse from "./getRequestResponse";

/**
 * Send a success response to an HTTP request with a structured format
 *
 * @param {object} options Options
 * @param {any} [options.result] The result of the successful operation
 * @param {string} [options.message] A message to be sent alongside the result. If not
 * provided, the response will consist only of the result data.
 * @param options.extraData
 * @returns {object} Json response indicating success
 */
const getSuccessResponse = ({ extraData, message }) =>
	getRequestResponse("positive", { extraData, message });
export default getSuccessResponse;
