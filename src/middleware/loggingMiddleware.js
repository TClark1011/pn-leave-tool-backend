import winston, { createLogger } from "winston";
import { logger as expressLogger } from "express-winston";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `[${timestamp}] [${level}] ${message}`
);

const baseFormat = winston.format.combine(
	winston.format.timestamp(),
	logFormat
);

const winstonInstance = createLogger({
	"transports": [
		new winston.transports.File({
			"filename": "logs.log",
			"format": baseFormat,
		}),
		new winston.transports.Console({
			"format": winston.format.combine(winston.format.colorize(), baseFormat),
			"colorize": true,
		}),
	],
});

const logger = expressLogger({
	winstonInstance,
	"meta": true,
	"msg": "HTTP {{req.method}} {{req.url}}",
	"expressFormat": true,
	"statusLevels": true,
});

export default logger;

/**
 * Log a message with a winston logger
 *
 * @param {string} message The message to log
 * @param {string} [level="info"] The level to tag to the log statement
 * @returns {loggerCall} Calls a winston logger, passing the provided parameters
 */
export const log = (message, level = "info") =>
	winstonInstance.log({ message, level });

/**
 * Convert a JSON object into a string so it can be logged
 *
 * @param {object} object The object to stringify
 * @returns {string} The stringified version of the passed object
 */
export const stringifyObject = (object) => JSON.stringify(object, null, 2);
