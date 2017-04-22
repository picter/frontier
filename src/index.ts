import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import * as handlebars from 'handlebars'
import * as winston from 'winston'
import * as ini from 'ini'

import renderJson, { renderJsonFile } from './files/json'
import renderMarkdown from './files/markdown'

winston.level = 'debug'

const cwd = process.cwd()

if (process.argv.length < 3) {
  throw new Error('Please provide an base directory as parameter.')
}

const directoryParam = process.argv[2]
const baseDirectory = path.join(cwd, directoryParam)

const allFiles = fs.readdirSync(baseDirectory)

const ignoreFiles = ['assets', 'index.ini', 'theme.sass']
const indexFile = path.join(baseDirectory, 'index.ini')
const themeFile = path.join(baseDirectory, 'theme.sass')

const files = allFiles.filter(
  file => !ignoreFiles.includes(file)
)
winston.debug('Files:', files)
winston.debug('Has index file:', fs.existsSync(indexFile))
winston.debug('Has theme file:', fs.existsSync(themeFile))

// Templates
const templateDirectory = path.join(cwd, 'templates')
const allTemplates = fs.readdirSync(templateDirectory)

const templates = allTemplates.filter(
  template => !['index.hbs'].includes(template)
)
winston.debug('Templates:', templates)

// Render
const indexOfFile = filename => parseInt(filename.split('-')[0])

const renderFile = file => {
  const filePath = path.join(baseDirectory, file)
  const fileType = path.extname(file).replace('.', '')
  const fileName = path.basename(file, path.extname(file))
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  winston.debug(fileName, fileType)

  switch (fileType) {
    case 'json':
      return renderJson(fileContent)
    case 'md':
      return renderMarkdown(fileContent)
    default:
      throw new Error(`Unkown file extension: ${fileType}.`)
  }
}

const content = files.sort((first, second) =>
  indexOfFile(first) - indexOfFile(second)
).map(
  file => renderFile(file)
).join('\n')

const indexFileContent = ini.parse(fs.readFileSync(indexFile, 'utf-8'))

const indexContent = Object.assign({}, {
  content: new handlebars.SafeString(content)
}, indexFileContent)

const result = renderJsonFile('index', indexContent)

console.log(result)
