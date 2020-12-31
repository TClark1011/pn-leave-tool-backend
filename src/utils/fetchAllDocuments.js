import clientFacingError from "./clientFacingError";
import clientFacingResult from "./clientFacingResult";

const fetchDocumentsFromModel = (Model) => {
	return async (req, res) => {
		try {
			const result = await Model.find();
			clientFacingResult(res, { result });
		} catch (err) {
			clientFacingError(res, { attempting: "fetch documents" });
		}
	};
};

export default fetchDocumentsFromModel;
