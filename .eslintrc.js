module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': false,
  },
  'rules': {
    'no-console': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "camelcase": 'off',
    "react/forbid-prop-types": [true, { "forbid": ['object'] }],
    "no-debugger": 'off',
    "array-callback-return": ["error", { allowImplicit: true }],
    "func-names": ["error", "never"],
    "no-param-reassign": ["error", { "props": false }],
    "react/sort-comp": [0, {
      order: ['lifecycle']
    }],
    "max-len": ["error", { "code": 200 }]
  },
  'globals': {
    "fetch": false
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },

}