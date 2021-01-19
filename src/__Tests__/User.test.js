import mongoose from "mongoose";
import supertest from "supertest";
import random from "random";
import getToken from "../utils/getToken";
import User from "../models/User.model";
import Depot from "../models/Depot.model";
import md5 from "md5";
import axios from "axios";

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

let testDepot = {};

const testEmail = `${random.int(10000, 99999999)}@mailkept.com`;
const emailHash = md5(testEmail);
/**
 * Fetch the email inbox used for testing
 *
 * @returns {Promise} Promise for a get request to fetch the inbox
 */
const fetchTestInbox = () =>
	axios({
		"method": "GET",
		"url": `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailHash}/`,
		"headers": {
			"x-rapidapi-key": process.env.EMAIL_TESTING_API_KEY,
			"x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
		},
	}).catch((err) => err);

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
	"email": testEmail,
	"depot": testDepot._id,
	"name": `Test User (${random.int(1000, 9999)})`,
});

let testCredentials = getRandomCredentials();
let startingInboxState;

beforeAll(async (done) => {
	testDepot = new Depot({
		"name": `Test Depot (${random.int(1000, 9999)})`,
		"drivers": random.int(40, 90),
		"hidden": true,
	});
	await testDepot.save();
	startingInboxState = await fetchTestInbox();
	done();
});

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
	await Depot.findOneAndDelete({ "_id": testDepot._id });
	await mongoose.connection.close();
});

const rootUrl = "/users";

describe("Can register new account and login", () => {
	it("Registers successfully with valid input", async (done) => {
		await api
			.post(`${rootUrl}/register`)
			.send(extendRegCredentials(testCredentials))
			.expect("Content-Type", /json/)
			.expect(200);
		done();
	});

	it("Sent the verification email", async (done) => {
		const newInboxState = await fetchTestInbox();
		expect(startingInboxState).not.toEqual(newInboxState);
		done();
	});

	it("Can resend the verification email", async (done) => {
		const preResendInboxState = await fetchTestInbox();
		await api.post(
			`${rootUrl}/resendVerification/${testCredentials.employee_number}`
		);
		const postResendInboxState = await fetchTestInbox();
		expect(preResendInboxState).not.toEqual(postResendInboxState);
		done();
	});

	it("Successfully verifies email", async (done) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await api
			.get(`${rootUrl}/verify/${getToken(testCredentials.employee_number)}`)
			.expect(302)
			.expect("Location", `${process.env.FRONTEND_URL}/login?verified`);
		done();
	});

	it("Allows login to new account", async (done) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await api.post(`${rootUrl}/login`).send(testCredentials).expect(200);
		done();
	});
});
describe("It cannot register without the required fields", () => {
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
