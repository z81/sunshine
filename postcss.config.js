const purgeCss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' }),
    process.env.NODE_ENV === 'production' &&
      purgeCss({
        content: ['**/*.html', './src/**/*.ts', './src/**/*.tsx'],
        css: ['./src/**/*.css'],
      }),
  ],
};
