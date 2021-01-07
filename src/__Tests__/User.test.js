import mongoose from "mongoose";
import supertest from "supertest";
import random from "random";
import getToken from "../utils/getToken";
import User from "../models/User.model";

let app;
let api;

/**
 * Generate a random digit
 *
 * @returns {number} a digit between 0 and 9
 */
const randomDigit = () => random.int(0, 9);

/**
 * Generates random user credentials to be used for testing
 *
 * @returns {object} user credentials
 */
const getRandomCredentials = () => ({
	"employee_number": `${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`,
	"password": "pppppp",
});

/**
 * Takes an object with "employee_number" and "password" fields and adds the extra fields required
 * for user registration
 *
 * @param {object} credentials The credentials to extend
 * @returns {object} credentials extended to include all fields necessary for registration
 */
const extendRegCredentials = (credentials) => ({
	...credentials,
	"confirm_employee_number": credentials.employee_number,
	"confirm_password": credentials.password,
	"email": "fake@email.com",
	"depot": "5fed444a2d9b4d4de4389063",
	"name": `Test User (${random.int(1000, 9999)})`,
});

let testCredentials = getRandomCredentials();

beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});

afterEach(async (done) => {
	delete require.cache[require.resolve("../app")];
	done();
});

afterAll(async () => {
	await User.findOneAndDelete({
		"employee_number": testCredentials.employee_number,
	});
	mongoose.connection.close();
});

const rootUrl = "/users";

describe("Can register new account and login", async () => {
	it("Registers successfully with valid input", async (done) => {
		await api
			.post(`${rootUrl}/register`)
			.send(extendRegCredentials(testCredentials))
			.expect("Content-Type", /json/)
			.expect(200);
		//TODO: Use random depot
		done();
	});

	it("Successfully verifies email", async (done) => {
		await api
			.get(`${rootUrl}/verify/${getToken(testCredentials.employee_number)}`)
			.expect(302)
			.expect("Location", `${process.env.FRONTEND_URL}/login?verified`);
		done();
	});

	it("Allows login to new account", async (done) => {
		await api.post(`${rootUrl}/login`).send(testCredentials).expect(200);
		done();
	});
});
describe("It annot register without the required fields", () => {
	const creds = extendRegCredentials(getRandomCredentials());
	const fields = Object.keys(creds);
	for (let i = 0; i < fields.length; i++) {
		const currentField = fields[i];
		const credsCopy = JSON.parse(JSON.stringify(creds));
		delete credsCopy[currentField];
		it(`Cannot register without the '${currentField}' field`, async (done) => {
			await api.post(`${rootUrl}/register`).send(credsCopy).expect(400);
			done();
		});
	}
});
