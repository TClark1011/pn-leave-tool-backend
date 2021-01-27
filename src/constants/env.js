import toBoolean from "to-boolean";
import { isTesting } from "../utils/ifNotTesting";

export const validateEmails =
	!process.env.VALIDATE_EMAIL ||
	(toBoolean(process.env.VALIDATE_EMAIL) && !isTesting);
