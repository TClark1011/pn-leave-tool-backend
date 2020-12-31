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
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": "off",
		"no-console": "off",
		"implicit-arrow-linebreak": "off",
		"arrow-body-style": "off",
		"operator-linebreak": "off",
	},
};
