import getErrorResponse from "./responses/getErrorResponse";
import getSuccessResponse from "./responses/getSuccessResponse";

/**
 * Generates a route handling function to fetch all documents from a given model
 *
 * @param  {Mongoose.Model} Model - The mongoose model from which all documents will be fetched
 * @returns {Function} A function that can be used as an express route handler and will fetch all
 * documents from given Model
 */
const fetchDocumentsFromModel = (Model) =>
	/**
	 * Handles a request to fetch all documents from 'Model'
	 *
	 * @param  {Express.Request} req - The http request to fetch the documents
	 * @param  {Express.Response} req - The express response object
	 */
	async (req, res) => {
		try {
			const result = await Model.find();
			console.log("(fetchAllDocuments) result: ", result);
			res.status(200).json(getSuccessResponse({ "extraData": result }));
		} catch (err) {
			res.status(500).json(getErrorResponse({ "attempting": "fetch documents" }));
		}
	};

export default fetchDocumentsFromModel;
