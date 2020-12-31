export default function mongooseConnect(mongoose, name) {
	mongoose.set("useFindAndModify", false);
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`${name} has connected to MongoDB`);
		})
		.catch((error) => {
			console.log("error connecting too MongoDB: ", error);
		});
}
