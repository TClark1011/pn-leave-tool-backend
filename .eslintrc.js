module.exports = {
	"env": {
		"es2021": true,
		"node": true,
	},
	"extends": ["eslint:recommended", "plugin:jsdoc/recommended"],
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module",
	},
	"plugins": ["jsdoc", "prefer-arrow"],
	"rules": {
		"indent": ["error", "tab", { "VariableDeclarator": 1 }],
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
		"jsdoc/no-undefined-types": "off",
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
