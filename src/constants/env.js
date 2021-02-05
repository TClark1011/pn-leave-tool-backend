import toBoolean from "to-boolean";

export const NODE_ENV = process.env.NODE_ENV;
export const isTesting = NODE_ENV === "test";
export const isInDevelopment = NODE_ENV === "development";
export const isInProd = NODE_ENV === "production";

export const PORT = process.env.PORT || 4004;

export const MONGO_URI = process.env.MONGO_URI;

const ENV_VALIDATE_EMAIL = process.env.VALIDATE_EMAIL;
export const VALIDATE_EMAIL =
	!ENV_VALIDATE_EMAIL ||
	(ENV_VALIDATE_EMAIL && toBoolean(ENV_VALIDATE_EMAIL) && !isTesting);
//? Whether or not to validate that email addresses for user accounts are official 'Pacific National' email addresses
//? Defaults to true if not provided
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
//? Email address for sending emails
export const EMAIL_USER = process.env.EMAIL_USER;
//? Username for email
export const EMAIL_OAUTH_ID = process.env.EMAIL_OAUTH_ID;
//? ID used for gmail OAuth authentication
export const EMAIL_OAUTH_CLIENT_SECRET = process.env.EMAIL_OAUTH_CLIENT_SECRET;
//? Secret used to generate authentication tokens for gmail OAuth
export const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
//? Refresh token used by gmail OAuth authentication
export const EMAIL_TESTING_API_KEY = process.env.EMAIL_TESTING_API_KEY;
//? Key for the api used to test emails
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;
//? Email address for customer support

export const OPERATOR_ACCESS_KEY = process.env.OPERATOR_ACCESS_KEY;
//? A key that must be provided when uploading LMS csv data

export const BACKEND_URL =
	process.env.BACKEND_URL || `http://localhost:${PORT}`;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const JWT_SECRET = process.env.JWT_SECRET;
