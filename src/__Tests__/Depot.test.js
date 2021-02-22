import mongoose from "mongoose";
import supertest from "supertest";
import DepotModel from "../models/Depot.model";
// import { assert } from "jest";

let app;
let api;

beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});

afterEach(async (done) => {
	delete require.cache[require.resolve("../app")];
	done();
});

afterAll(async () => {
	await mongoose.connection.close();
});

it("Returns list of depots", async (done) => {
	const depots = await DepotModel.find({});
	await api
		.get("/depots")
		.expect("Content-Type", /json/)
		.expect(200)
		.then((res) => {
			for (let i = 0; i < res.body.length; i++) {
				expect(res.body[i].hidden).toEqual(depots[i].hidden);
				expect(res.body[i].name).toEqual(depots[i].name);
				expect(res.body[i].drivers).toEqual(depots[i].drivers);
			}
		});
	done();
});
