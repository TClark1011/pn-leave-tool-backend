module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	overrides: {
		quotes: ["error", "double"],
		indent: ["error", "tab"],
	},
};
