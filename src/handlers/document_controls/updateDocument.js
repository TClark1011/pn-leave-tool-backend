import getErrorResponse from "../../utils/responses/getErrorResponse";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

/**
 * Generates a route handling function to update an existing model
 *
 * @param {Mongoose.Model} Model The mongoose model from which the new document is created
 * @param {string} [field="_id"] The field to use to find the document. Defaults to "_id".
 * @returns {Function} A function that can be used as an express route handler and will create
 * a new document
 */
const updateDocument = (Model, field = "_id") =>
	/**
	 * Handles a request to create a new document
	 *
	 * @param  {Express.Request} req - The http request to update the document
	 * @param  {Express.Response} res - The express response object
	 */
	async (req, res) => {
		const filter = {};
		filter[field] = req.body[field];
		try {
			const updatedDocument = await Model.findOneAndUpdate(filter, req.body, {
				"new": true,
			});
			res.status(200).json(
				getSuccessResponse({
					"message": "The document was updated successfully",
					"extraData": updatedDocument,
				})
			);
		} catch (err) {
			res.status(500).json(
				getErrorResponse({
					"attempting": "update new document",
				})
			);
		}
	};

export default updateDocument;
