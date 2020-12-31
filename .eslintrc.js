module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["airbnb-base"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {},
	overrides: {
		quotes: ["error", "double"],
		indent: ["error", "tab"],
	},
};
