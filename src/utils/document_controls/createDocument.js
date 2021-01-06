import getErrorResponse from "../responses/getErrorResponse";
import getSuccessResponse from "../responses/getSuccessResponse";

/**
 * Generates a route handling function to create documents of the type of a given Model
 *
 * @param  {Mongoose.Model} Model - The mongoose model from which the new document is created
 * @returns {Function} A function that can be used as an express route handler and will create
 *  a new document
 */
const createDocument = (Model) =>
	/**
	 * Handles a request to create a new document
	 *
	 * @param  {Express.Request} req - The http request to create the document
	 * @param  {Express.Response} res - The express response object
	 */
	async (req, res) => {
		try {
			const newDocument = await new Model(req.body);
			await newDocument.save();
			res.status(200).json(
				getSuccessResponse({
					"message": "The document was created successfully",
					"extraData": newDocument,
				})
			);
		} catch (err) {
			res.status(500).json(
				getErrorResponse({
					"attempting": "create a new document",
				})
			);
		}
	};

export default createDocument;
