export default function mongooseConnect(mongoose, name) {
	mongoose.set("useFindAndModify", false);
	console.log(`${name} is connecting to ${process.env.MONGO_URI}`);
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
