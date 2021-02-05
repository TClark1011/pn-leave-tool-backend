import { isTesting } from "../constants/env";

/**
 * Runs provided function if the NODE_ENV environment variable is not set to test
 *
 * @param {Function} action The function to be run
 */
const ifNotTesting = (action) => {
	if (!isTesting) {
		action();
	}
};

export default ifNotTesting;
