"use strict";
import customConfig from "eslint-config";
import eslintPluginImport from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config({
    extends: [...customConfig],
    plugins: {
        import: eslintPluginImport,
    },
    rules: {
        "import/extensions": ["error", "ignorePackages"],
    },
});
