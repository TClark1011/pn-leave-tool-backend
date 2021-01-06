import { validationFailMsg } from "../constants/messages";
import getErrorResponse from "../utils/responses/getErrorResponse";

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
		res
			.status(400)
			.json(getErrorResponse({ "fullMessage": message, "extraData": err.errors }));
		return;
	}
};

export default validationMiddleware;
