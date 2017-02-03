const fs = require('fs')
const path = require('path')
const process = require('process')
const handlebars = require('handlebars')

const cwd = process.cwd()

if (process.argv.length < 3) {
  return console.log('Please provide an base directory as parameter.')
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
console.log('Files:', files)
console.log('Has index file:', fs.existsSync(indexFile))
console.log('Has theme file:', fs.existsSync(themeFile))

// Templates
const templateDirectory = path.join(cwd, 'templates')
const allTemplates = fs.readdirSync(templateDirectory)

const templates = allTemplates.filter(
  template => !['index.hbs'].includes(template)
)
console.log('Templates:', templates)

// Render
const indexOfFile = filename => parseInt(filename.split('-')[0])

const renderJsonFile = (template, content) => {
  const templatePath = path.join(cwd, 'templates', template + '.hbs')
  const templateContent = fs.readFileSync(templatePath, 'utf-8')
  const templateHbs = handlebars.compile(templateContent)
  return templateHbs(content)
}

const renderFile = file => {
  const filePath = path.join(baseDirectory, file)
  const fileType = path.extname(file).replace('.', '')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  console.log(file, fileType)

  switch (fileType) {
    case 'json':
      const { template, content } = JSON.parse(fileContent)
      return renderJsonFile(template, content)
    case 'md':
      return ''
    default:
      throw new Error(`Unkown file extension: ${fileType}.`)
  }
}

const content = files.sort((first, second) =>
  indexOfFile(first) - indexOfFile(second)
).map(
  file => renderFile(file)
).join('\n')


const indexFileContent = fs.readFileSync(indexFile, 'utf-8')

const indexContent = Object.assign({}, {
  content: new handlebars.SafeString(content),
}, indexFileContent)

const result = renderJsonFile('index', indexContent)

console.log(result)
