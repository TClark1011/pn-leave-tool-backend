/**
 * Connects a mongoose instance to MongoDB that is used to initialise a Model.
 *
 * @param {MongooseInstance} mongoose - An instance of mongoose
 * @param {string} name - The name of the Model being initialised
 */
const mongooseConnect = (mongoose, name) => {
	mongoose.set("useFindAndModify", false);
	mongoose
		.connect(process.env.MONGO_URI, {
			"useNewUrlParser": true,
			"useUnifiedTopology": true,
		})
		.then(() => {
			console.log(`${name} has connected to MongoDB`);
		})
		.catch((error) => {
			console.log("error connecting too MongoDB: ", error);
		});
};

export default mongooseConnect;
