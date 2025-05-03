import type tseslint from "typescript-eslint";

declare const config: ReturnType<typeof tseslint.config>;
export default config;
