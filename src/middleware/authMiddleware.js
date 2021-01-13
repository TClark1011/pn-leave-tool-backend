import express from "express";
import decodeToken from "../utils/decodeToken";
import getErrorResponse from "../utils/responses/getErrorResponse";
import getServerError from "../utils/responses/getErrorResponse";
import { log } from "./loggingMiddleware";

const authErrorCode = 401;

/**
 * Generate an authentication middleware route of a specified type
 *
 * @param {string} type The type of authentication to be tested
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
					req.headers.operator_access_key &&
					req.headers.operator_access_key === process.env.OPERATOR_ACCESS_KEY
				) {
					return next();
				}
				log(
					"Failed authentication due to incorrect operator access key",
					"warn"
				);
				return res.status(authErrorCode).json(
					getErrorResponse({
						"fullMessage": "Incorrect operator access key",
					})
				);
			case "login":
				if (
					req.headers.authorisation &&
					decodeToken(req.headers.authorisation) === employeeNumber
				) {
					return next();
				}
				log("Failed authentication due to bad token", "warn");
				return res.status(authErrorCode).json(
					getServerError({
						"fullMessage": "Bad authentication token",
					})
				);
			default:
				return res.status(authErrorCode).json(
					getServerError({
						"fullMessage": `Undefined authentication type: '${type}`,
					})
				);
		}
	});
	return authMiddleware;
};

export default getAuthMiddleware;
