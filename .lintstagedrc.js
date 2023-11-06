const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`


module.exports = {
  '*.{css, scss}': 'yar n stylelint \"**/*.{css,scss}\"',
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
