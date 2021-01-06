/**
 * Apply default values to an object by iterating through the fields
 * of an object which contains desierd defaults, if the target object
 * does not contain a value at a key that is provided in the defaults
 * object, the value from the defaults object is copied into the
 * target.
 *
 * @param {object} target The object to enforce default values on
 * @param {object} defaults An object containing the desired default values
 * @returns {object} The original object with defaults enforrced
 */
const checkObjectDefaults = (target, defaults) => {
	Object.keys(defaults).map((item) => {
		target[item] = target[item] || defaults[item];
	});
	return target;
};

export default checkObjectDefaults;
