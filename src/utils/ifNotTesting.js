/**
 * Runs provided function if the NODE_ENV environment variable is not set to test
 *
 * @param {Function} action The function to be run
 */
const ifNotTesting = (action) => {
	if (process.env.NODE_ENV !== "test") {
		action();
	}
};

export default ifNotTesting;
