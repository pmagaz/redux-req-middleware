module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [],
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'import/no-extraneous-dependencies': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "import/no-duplicates": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "comma-dangle": 0,
    "indent": [2, 2, {"SwitchCase": 1}],    
    "no-console": 0,
    "no-alert": 0,
    "semi": 2,
    "eol-last": 0,
    "no-trailing-spaces": 0,
    "padded-blocks": 0,
    "no-var": 2,
    "arrow-parens": 0,
    "space-before-blocks": 2,
    "keyword-spacing": 2,
    "no-global-assign": 0,
    "no-unsafe-negation": 0,
    "linebreak-style": 0,
    "no-use-before-define": 0
  }
}