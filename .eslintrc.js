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
	rules: {
		quotes: ["error", "double"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab"],
		"linebreak-style": "off",
	},
};
