"use strict";

import globals from "globals";
import esLintConfig from "./src/eslint.config.js";

export default [
    ...esLintConfig,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];
