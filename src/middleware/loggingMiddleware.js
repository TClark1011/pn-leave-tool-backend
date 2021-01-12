import winston from "winston";
import { logger } from "express-winston";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);

const loggerOptions = {
	"format": winston.format.combine(winston.format.timestamp(), logFormat),
	"meta": true,
	"msg": "HTTP {{req.method}} {{req.url}}",
	"expressFormat": true,
};

export const infoLogger = logger({
	"transports": [new winston.transports.File({ "filename": "logs/info.log" })],
	"level": "info",
	...loggerOptions,
});

export const warnLogger = logger({
	"transports": [new winston.transports.File({ "filename": "logs/warn.log" })],
	"level": "warn",
	...loggerOptions,
});

export const errorLogger = logger({
	"transports": [new winston.transports.File({ "filename": "logs/error.log" })],
	"level": "error",
	...loggerOptions,
});
