import toBoolean from "to-boolean";
import { isTesting } from "../utils/ifNotTesting";

export const ENV_VALIDATE_EMAIL = process.env.VALIDATE_EMAIL;

export const validateEmails =
	!ENV_VALIDATE_EMAIL ||
	(ENV_VALIDATE_EMAIL && toBoolean(ENV_VALIDATE_EMAIL) && !isTesting);
