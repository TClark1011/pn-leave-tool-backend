import { validationFailMsg } from "../constants/messages";
import getError from "../utils/getError";

/**
 * Generate a express route handler that takes  a request and validate.
 * Pass request on the next handler if validation is successful;
 * Give error response if validation fails
 *
 * @param {yup.object} schema The yup validation schema to be used to validate the request
 * @param {string} [message=validationFailMsg] The message to send back on failed validation
 * @returns {Express.RouteHandler} A function that handles a request
 */
const validationMiddleware = (schema, message = validationFailMsg) => async (
	req,
	res,
	next
) => {
	try {
		await schema.validate(req.body);
		next();
	} catch (err) {
		throw getError(message, { "status": 400, "extraData": err.errors });
	}
};

export default validationMiddleware;
