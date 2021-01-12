import winston from "winston";
import { logger } from "express-winston";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `[${timestamp}] [${level}] : ${message}`
);

const baseFormat = winston.format.combine(winston.format.timestamp(), logFormat),

const options = {
	"meta": true,
	"msg": "HTTP {{req.method}} {{req.url}}",
	"expressFormat": true,
	"statusLevels": true,
}

const fileLogger = logger({
	"transports": [
		new winston.transports.File({ "filename": "logs.log" }),
	],
	"format": baseFormat,
	...options
});

export default loggerMiddleware;
