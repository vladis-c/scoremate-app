module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
