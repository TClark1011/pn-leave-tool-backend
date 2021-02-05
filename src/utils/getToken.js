import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";

/**
 * Generate a jwt token from a provided employee number
 *
 * @param {string} employee_number The employee number from which to generate the token
 * @returns {string} JWT token generated from 'employee_number'
 */
const getToken = (employee_number) => jwt.sign(employee_number, JWT_SECRET);

export default getToken;
