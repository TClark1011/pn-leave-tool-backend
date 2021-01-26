import winston, { createLogger } from "winston";
import { logger as expressLogger } from "express-winston";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `[${timestamp}] [${level}] ${message}`
);

const baseFormat = winston.format.combine(
	winston.format.timestamp(),
	logFormat
);

const customLevels = {
	"levels": { "error": 0, "warn": 1, "info": 2, "verbose": 3, "cleanup": 4, "debug": 5 },
	"colors": {
		"error": "red",
		"warn": "yellow",
		"info": "green",
		"debug": "magenta",
		"cleanup": "blue",
	},
};

const winstonInstance = createLogger({
	"transports": [
		new winston.transports.File({
			"filename": "logs.log",
			"format": baseFormat,
			"level": "cleanup",
		}),
		new winston.transports.Console({
			"format": winston.format.combine(winston.format.colorize(), baseFormat),
			"colorize": true,
			"level": "debug",
		}),
	],
	"levels": customLevels.levels,
});

winston.addColors(customLevels.colors);

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
export const log = (message, level = "info") => {
	if (!Object.keys(customLevels.levels).includes(level)) {
		throw TypeError("log level must be one of the following: " + stringifyObject(level));
	}
	return winstonInstance.log({ message, level });
};

/**
 * Convert a JSON object into a string so it can be logged
 *
 * @param {object} object The object to stringify
 * @returns {string} The stringified version of the passed object
 */
export const stringifyObject = (object) => JSON.stringify(object, null, 2);
