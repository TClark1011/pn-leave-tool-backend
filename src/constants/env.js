import toBoolean from "to-boolean";
import { isTesting } from "../utils/ifNotTesting";

export const ENV_VALIDATE_EMAIL = process.env.VALIDATE_EMAIL;

export const validateEmails =
	!ENV_VALIDATE_EMAIL ||
	(ENV_VALIDATE_EMAIL && toBoolean(ENV_VALIDATE_EMAIL) && !isTesting);

export const PORT = process.env.PORT || 4004;

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_OAUTH_ID = process.env.EMAIL_OAUTH_ID;
export const EMAIL_OAUTH_CLIENT_SECRET = process.env.EMAIL_OAUTH_CLIENT_SECRET;
export const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
export const EMAIL_TESTING_API_KEY = process.env.EMAIL_TESTING_API_KEY;
//? Key for the api used to test emails
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;

export const OPERATOR_ACCESS_KEY = process.env.OPERATOR_ACCESS_KEY;

export const BACKEND_URL = BACKEND_URL || `http://localhost:${PORT}`;
export const FRONTEND_URL = FRONTEND_URL || "http://localhost:3000";
