import { MONGO_URI } from "../constants/env";
import { log } from "../middleware/loggingMiddleware";

/**
 * Connects a mongoose instance to MongoDB that is used to initialise a Model.
 *
 * @param {MongooseInstance} mongoose - An instance of mongoose
 * @param {string} name - The name of the Model being initialised
 */
const mongooseConnect = (mongoose, name) => {
	mongoose.set("useFindAndModify", false);
	mongoose
		.connect(MONGO_URI, {
			"useNewUrlParser": true,
			"useUnifiedTopology": true,
		})
		.then(() => {
			log(`'${name}' model has connected to MongoDB`);
		});
};

export default mongooseConnect;
