/**
 * Generate an error to be thrown/passed to error handling middleware
 *
 * @param {string} message The error message
 * @param {object | number} extraInfo Extra data to be attached to the error. If a number is provided then it is used as the response status code
 * @returns {Error} Generated error to be thrown and thus passed to the error handling middleware
 */
const getError = (message, extraInfo = 500) => {
	const error = Error(message);
	if (typeof extraInfo === "object") {
		for (let key of Object.keys(extraInfo)) {
			error[key] = extraInfo[key];
		}
	} else {
		error.status = extraInfo;
	}
	return error;
};

export default getError;
