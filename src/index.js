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

const ignoreFiles = ['assets']
const indexFile = path.join(baseDirectory, 'index.ini')

const filteredFiles = files.filter(
  file => !ignoreFiles.includes(file)
)
console.log(filteredFiles)
console.log('Has index file:', fs.existsSync(indexFile))
