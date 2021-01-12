import express from "express";
import decodeToken from "../utils/decodeToken";
import getErrorResponse from "../utils/responses/getErrorResponse";
import getServerError from "../utils/responses/getErrorResponse";

const authErrorCode = 401;

/**
 * Generate an authentication middleware route of a specified type
 *
 * @param {string} authTypes The type of authentication to use
 * @returns {Express.Route} A middleware route that will authenticate requests
 */
const getAuthMiddleware = (authTypes) => {
	const authMiddleware = express.Router();
	authMiddleware.all("/*", async (req, res, next) => {
		if (typeof authType === "string") {
			authTypes = [authTypes];
		}
		const employeeNumber =
			req.body.employee_number || req.body.user || req.query.user;
		authTypes.forEach((type, index) => {
			switch (type) {
				case "operator_access_key":
					if (
						req.headers.operator_access_key &&
						req.headers.operator_access_key === process.env.OPERATOR_ACCESS_KEY
					) {
						return next();
					}
					if (index === authTypes.length - 1) {
						return res.status(authErrorCode).json(
							getErrorResponse({
								"fullMessage": "Incorrect operator access key",
							})
						);
					}
					break;
				case "login":
					if (
						req.headers.authorisation &&
						decodeToken(req.headers.authorisation) === employeeNumber
					) {
						return next();
					}
					if (index === authTypes.length - 1) {
						return res.status(authErrorCode).json(
							getServerError({
								"fullMessage": "Bad authentication token",
							})
						);
					}
					break;
				default:
					if (index === authTypes.length - 1) {
						return res.status(authErrorCode).json(
							getServerError({
								"fullMessage": `Undefined authentication type: '${type}`,
							})
						);
					}
			}
		});
	});
	return authMiddleware;
};

/**
 * @param type
 * @param authErrorCode
 */
const checkAuth = (type, authErrorCode) => {};

export default getAuthMiddleware;
