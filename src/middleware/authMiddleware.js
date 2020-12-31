import express from "express";
import clientFacingError from "../utils/clientFacingError";

const authErrorCode = 401;

const getAuthMiddleware = (type) => {
	const authMiddleware = express.Router();
	authMiddleware.all("/*", async (req, res, next) => {
		switch (type) {
			case "operator_access_key":
				if (
					req.headers.operator_access_key === process.env.OPERATOR_ACCESS_KEY
				) {
					return next();
				}
				return clientFacingError(res, {
					status: authErrorCode,
					fullMessage: "Incorrect operator access key",
				});
			default:
				console.log(`undefined authentication type '${type}' was attempted`);
				return clientFacingError(res, {
					status: authErrorCode,
					fullMessage: "Undefined authentication type",
				});
		}
	});
	return authMiddleware;
};

export default getAuthMiddleware;
