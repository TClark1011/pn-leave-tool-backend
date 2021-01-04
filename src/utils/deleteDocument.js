import getErrorResponse from "./responses/getErrorResponse";
import clientFacingResult from "./clientFacingResult";

/**
 * Generates a route handling function to delete documents of the type of a given Model
 *
 * @param  {Mongoose.Model} [Model] - The mongoose model from which a document should be deleted
 * @returns {Function} A function that can be used as an express route handler and will delete
 *  a document
 */
const deleteDocument = (Model) =>
	/**
	 * Handles a request to delete a document
	 *
	 * @param  {Express.Request} [req] - The http request to delete the document
	 * @param  {Express.Response} [res] - The express response object
	 */
	async (req, res) => {
		try {
			const { "id": targetId } = req.params;

			const deleteResult = await Model.findByIdAndDelete(targetId);

			clientFacingResult(res, {
				"message": "Successfully deleted the document",
				"result": deleteResult,
			});
		} catch (err) {
			const response = getErrorResponse({
				"attempting": "delete a document",
			});
			res.status(500).json(response);
		}
	};

export default deleteDocument;
