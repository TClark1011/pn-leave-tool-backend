export default (
	res,
	{
		attempting = "",
		attemptingPrefix = "There was an error while trying to ",
		fullMessage = "There was an error",
		status = 500,
		rawError,
	},
) => {
	const response = {
		message:
			fullMessage && !attempting ? fullMessage : attemptingPrefix + attempting,
	};
	if (rawError) {
		response.rawError = rawError;
	}
	return res.status(status).json(response);
};
