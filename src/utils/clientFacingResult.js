export default (res, { status = 200, message = "", result = {} }) =>
	res.status(status).json(message ? { message, result } : result);
