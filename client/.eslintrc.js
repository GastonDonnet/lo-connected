module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'airbnb', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['prettier'],
  rules: {
    //   'prettier/prettier': 'error',
    'spaced-comment': 'off',
    'no-console': 'warn',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next|val' }],
    'not-devDependencies': 'off',
  },
};
