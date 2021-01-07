module.exports = {
	"env": {
		"es2021": true,
		"node": true,
		"jest": true,
	},
	"extends": ["eslint:recommended", "plugin:jsdoc/recommended"],
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module",
	},
	"plugins": ["jsdoc", "prefer-arrow"],
	"rules": {
		"indent": [
			"error",
			"tab",
			{
				"VariableDeclarator": 1,
				"SwitchCase": 1,
				"ignoredNodes": ["ConditionalExpression"],
			},
		],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"quote-props": ["error", "always"],
		"prefer-arrow-callback": ["error"],
		"brace-style": "error",
		"linebreak-style": "off",
		"jsdoc/require-jsdoc": [
			"error",
			{
				"require": {
					"ArrowFunctionExpression": true,
					"FunctionDeclaration": true,
				},
			},
		],
		"no-mixed-spaces-and-tabs": "off",
		"jsdoc/no-undefined-types": "off",
		"no-useless-escape": "off",
		"prefer-arrow/prefer-arrow-functions": [
			"error",
			{
				"disallowPrototype": true,
				"singleReturnOnly": false,
				"classPropertiesAllowed": false,
			},
		],
	},
};
