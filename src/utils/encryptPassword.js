import bcrypt from "bcrypt";

/**
 * Encrypts a provided with bcrypt
 *
 * @param {string} password The password to encrypts
 * @returns {string} The encrypted version of the provided password
 */
const encryptPassword = async (password) => await bcrypt.hash(password, 10);

export default encryptPassword;
