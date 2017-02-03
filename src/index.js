const fs = require('fs')
const path = require('path')
const process = require('process')

const cwd = process.cwd()

if (process.argv.length < 3) {
  return console.log('Please provide an organisation slug as parameter.')
}

const organisationSlug = process.argv[2]
const organisationFolder = path.join(cwd, 'organisations', organisationSlug)

const files = fs.readdirSync(organisationFolder)
console.log(files)
