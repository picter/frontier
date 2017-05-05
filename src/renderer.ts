import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as ini from 'ini';
import * as path from 'path';
import * as winston from 'winston';

import json, { renderJsonFile } from './files/json';
import markdown from './files/markdown';
import templates from './templates';
import postprocess from './postprocess';

export const renderFile = (baseDirectory, file) => {
  const filePath = path.join(baseDirectory, file);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error('File to render does not exist (' + filePath + ').');
  }

  const fileType = path.extname(file).replace('.', '');
  const fileName = path.basename(file, path.extname(file));
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  winston.debug(fileName, fileType);

  switch (fileType) {
    case 'json':
      return json(fileContent);
    case 'md':
      return markdown(fileContent);
    default:
      throw new Error(`Unkown file extension: ${fileType}.`);
  }
};

export const renderPage = baseDirectory => {
  const allFiles = fs.readdirSync(baseDirectory);

  const ignoreFiles = ['assets', 'styles', 'index.ini', 'theme.sass'];
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

  return postprocess(renderJsonFile('index', indexContent));
};
