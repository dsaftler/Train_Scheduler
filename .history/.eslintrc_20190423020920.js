module.exports = {
  "extends": "standard",
   env: {
     node: true,
     es6: true
   },
   rules: {
    "no-console": "off",
    "eqeqeq": "warn",
    "curly": "error",
    "quotes": ["error", "double"],
    "no-duplicate-case": "warn",
    "no-extra-semi": "warn",
    "no-unexpected-multiline": "warn",
    "block-scoped-var": "warn",
    "class-methods-use-this": "warn",
    "dot-notation": "warn",
    "no-implicit-coercion": "warn",
    "no-invalid-this": "warn",
    "no-param-reassign": "warn",
    "init-declarations": ["warn", "always"],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-use-before-define": ["warn", { "functions": true, "classes": true }],
    "camelcase": ["warn", { "properties": "always" }, { "properties": "always" }],
    "no-var": "warn",
    "no-multiple-empty-lines": "off"
   }
}