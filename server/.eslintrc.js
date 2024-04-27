const config = {
  root: true,
  reportUnusedDisableDirectives: true,
  extends: ["prettier", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    project: true,
  },
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/require-await": "warn",
      },
    },
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "node_modules/",
    "dist/",
    "build/",
  ],
};

module.exports = config;
