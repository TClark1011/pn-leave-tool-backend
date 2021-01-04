/**
 * Send a success response to an HTTP request with a structured format
 *
 * @param {Express.Response} [res] - The express http response object
 * @param {object} [options] - Options regarding the response
 * @param {number} [options.status=200] - The http status code to be used in the response
 * @param {any} [options.result={}] - The result of the successful operation
 * @param {string} [options.message] - A message to be sent alongside the result. If not
 * provided, the response will consist only of the result data.
 * @returns {Express.ResponseDispatch} Sends the response
 */
const clientFacingResult = (res, { status = 200, result = {}, message }) =>
	res.status(status).json(message ? { message, result } : result);
export default clientFacingResult;
