import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

import json, { renderJsonFile } from './files/json';
import markdown from './files/markdown';

export const renderFile = (baseDirectory, file) => {
  const filePath = path.join(baseDirectory, file);
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
