import express from "express";
import jwt from "jsonwebtoken";
import clientFacingError from "../utils/clientFacingError";

const authErrorCode = 401;

/**
 * Generate an authentication middleware route of a specified type
 *
 * @param {string} type The type of authentication to use
 * @returns {Express.Route} A middleware route that will authenticate requests
 */
const getAuthMiddleware = (type) => {
	const authMiddleware = express.Router();
	authMiddleware.all("/*", async (req, res, next) => {
		const employeeNumber =
			req.body.employee_number || req.body.user || req.query.user;
		switch (type) {
			case "operator_access_key":
				if (
					req.headers.operator_access_key === process.env.OPERATOR_ACCESS_KEY
				) {
					return next();
				}
				return clientFacingError(res, {
					"status": authErrorCode,
					"fullMessage": "Incorrect operator access key",
				});
			case "login":
				if (
					(await jwt.verify(
						req.header.authorisation,
						process.env.JWT_SECRET
					)) === employeeNumber
				) {
					return next();
				}
				return clientFacingError(res, {
					"status": authErrorCode,
					"fullMessage": "Bad authentication token",
				});
			default:
				console.log(`undefined authentication type '${type}' was attempted`);
				return clientFacingError(res, {
					"status": 500,
					"fullMessage": "Undefined authentication type",
				});
		}
	});
	return authMiddleware;
};

export default getAuthMiddleware;
