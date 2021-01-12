import winston from "winston";
import { logger } from "express-winston";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `[${timestamp}] [${level}] : ${message}`
);

const baseFormat = winston.format.combine(
	winston.format.timestamp(),
	logFormat
);

const options = {
	"meta": true,
	"msg": "HTTP {{req.method}} {{req.url}}",
	"expressFormat": true,
	"statusLevels": true,
};

export const fileLogger = logger({
	"transports": [new winston.transports.File({ "filename": "logs.log" })],
	"format": baseFormat,
	...options,
});

export const consoleLogger = logger({
	"transports": [new winston.transports.Console()],
	"format": winston.format.combine(winston.format.colorize(), baseFormat),
	"colorize": true,
	"prettyPrint": true,
	...options,
});

//# Used for manual logging
export const manualLogger = winston.createLogger({
	"transports": [new winston.transports.Console()],
	"format": winston.format.combine(winston.format.colorize(), baseFormat),
	"colorize": true,
	"prettyPrint": true,
	...options,
});

/**
 * Log a message with a winston logger
 *
 * @param {string} message The message to log
 * @param {string} [level="info"] The level to tag to the log statement
 * @returns {loggerCall} Calls a winston logger, passing the provided parameters
 */
export const log = (message, level = "info") =>
	manualLogger.log({ message, level });
