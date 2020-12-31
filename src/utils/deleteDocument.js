import clientFacingError from "./clientFacingError";
import clientFacingResult from "./clientFacingResult";

const deleteDocument = (Model) => async (req, res) => {
	try {
		const { id: targetId } = req.params;

		const deleteResult = await Model.findByIdAndDelete(targetId);

		clientFacingResult(res, {
			message: "Successfully deleted the document",
			result: deleteResult,
		});
	} catch (err) {
		console.log("There was an error trying to delete a document: ", err);
		clientFacingError(res, {
			attempting: "delete a document",
		});
	}
};

export default deleteDocument;
