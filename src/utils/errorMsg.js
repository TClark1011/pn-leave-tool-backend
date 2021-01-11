/**
 * Generated an error message
 *
 * @param {string} attempting What action was being attempted when the error occurred
 * @returns {string} An error message
 */
const errorMsg = (attempting) =>
	`There was an error while attempting to ${attempting}. Please try again later.`;

export default errorMsg;
