import checkObjectDefaults from "../../utils/checkObjectDefaults";
import getErrorResponse from "../../utils/responses/getErrorResponse";
import getSuccessResponse from "../../utils/responses/getSuccessResponse";

const defaultOptions = {
	"keyField": "_id",
	"successMessage": "The document was updated successfully",
	"errorMessage": "There was an error while attempting to update a document",
};

/**
 * Generates a route handling function to update an existing model
 *
 * @param {Mongoose.Model} Model The mongoose model from which the new document is created
 * @param {Mongoose.Model} options options about the operation
 * @param {string} [options.keyField="_id"] The field to use to find the document. Defaults to "_id".
 * @param {string} [options.successMessage="The document was updated successfully"] The message to
 * put in the response "message" field if the update request is successful
 * @param keyField
 * @param successMessage
 * @returns {Function} A function that can be used as an express route handler and will create
 * a new document
 */
const updateDocument = (Model, options = {}) =>
	/**
	 * Handles a request to create a new document
	 *
	 * @param  {Express.Request} req - The http request to update the document
	 * @param  {Express.Response} res - The express response object
	 */
	async (req, res) => {
		const { keyField, successMessage, errorMessage } = checkObjectDefaults(
			options,
			defaultOptions
		);
		console.log("(updateDocument) options: ", {
			keyField,
			successMessage,
			errorMessage,
		});
		const filter = {};
		filter[keyField] = req.body[keyField];
		try {
			const updatedDocument = await Model.findOneAndUpdate(filter, req.body, {
				"new": true,
			});
			res.status(200).json(
				getSuccessResponse({
					"message": successMessage,
					"extraData": updatedDocument,
				})
			);
		} catch (err) {
			console.log("There was an error while updating a document: ", err);
			res.status(500).json(
				getErrorResponse({
					"fullMessage": errorMessage,
				})
			);
		}
	};

export default updateDocument;
