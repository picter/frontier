const fs = require('fs')
const path = require('path')
const process = require('process')

const cwd = process.cwd()

if (process.argv.length < 3) {
  return console.log('Please provide an base directory as parameter.')
}

const directoryParam = process.argv[2]
const baseDirectory = path.join(cwd, directoryParam)

const files = fs.readdirSync(baseDirectory)

const ignoreFiles = ['assets', 'index.ini', 'theme.sass']
const indexFile = path.join(baseDirectory, 'index.ini')
const themeFile = path.join(baseDirectory, 'theme.sass')

const filteredFiles = files.filter(
  file => !ignoreFiles.includes(file)
)
console.log(filteredFiles)
console.log('Has index file:', fs.existsSync(indexFile))
console.log('Has theme file:', fs.existsSync(themeFile))

// Templates
const templateDirectory = path.join(cwd, 'templates')
const allTemplates = fs.readdirSync(templateDirectory)

const templates = allTemplates.filter(
  template => !['index.hbs'].includes(template)
)

console.log(templates)
