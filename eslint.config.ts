import eslintPluginAstro from 'eslint-plugin-astro';
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";

export default [js.configs.recommended, typescript.configs.recommended, ...eslintPluginAstro.configs.recommended, {
    rules: {}
}];
