import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as handlebars from 'handlebars';
import * as winston from 'winston';
import * as ini from 'ini';

import { renderJsonFile } from './files/json';
import templates from './templates';
import { renderFile } from './renderer';
import postprocess from './postprocess';

winston.level = 'debug';

const cwd = process.cwd();

if (process.argv.length < 3) {
  throw new Error('Please provide an base directory as parameter.');
}

const directoryParam = process.argv[2];
const baseDirectory = path.join(cwd, directoryParam);

const allFiles = fs.readdirSync(baseDirectory);

const ignoreFiles = ['assets', 'index.ini', 'theme.sass'];
const indexFile = path.join(baseDirectory, 'index.ini');
const themeFile = path.join(baseDirectory, 'theme.sass');

const files = allFiles.filter(
  file => !ignoreFiles.includes(file),
);
winston.debug('Files:', files);
winston.debug('Has index file:', fs.existsSync(indexFile));
winston.debug('Has theme file:', fs.existsSync(themeFile));

winston.debug('Templates:', templates);

// Render
const indexOfFile = filename => parseInt(filename.split('-')[0], 10);

const content = files.sort((first, second) =>
  indexOfFile(first) - indexOfFile(second),
).map(
  file => renderFile(baseDirectory, file),
).join('\n');

const indexFileContent = ini.parse(fs.readFileSync(indexFile, 'utf-8'));

const indexContent = Object.assign({}, {
  content: new handlebars.SafeString(content),
}, indexFileContent);

const result = postprocess(renderJsonFile('index', indexContent));

console.log(result);
