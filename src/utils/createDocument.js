import clientFacingError from "./clientFacingError";
import clientFacingResult from "./clientFacingResult";

const createDocument = (Model) => async (req, res) => {
	try {
		const newDocument = await new Model(req.body);
		await newDocument.save();
		clientFacingResult(res, {
			message: "The document was created successfully",
			result: newDocument,
		});
	} catch (err) {
		clientFacingError(res, { attempting: "create a new document" });
	}
};

export default createDocument;
