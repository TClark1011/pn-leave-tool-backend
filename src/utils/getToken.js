import jwt from "jsonwebtoken";

/**
 * Generate a jwt token from a provided employee number
 *
 * @param {string} employee_number The employee number from which to generate the token
 * @returns {string} JWT token generated from 'employee_number'
 */
const getToken = (employee_number) =>
	jwt.sign(employee_number, process.env.JWT_SECRET);

export default getToken;
