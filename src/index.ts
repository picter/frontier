import * as path from 'path';
import * as process from 'process';
import * as winston from 'winston';

import { renderPage } from './renderer';

winston.level = 'debug';

const cwd = process.cwd();

if (process.argv.length < 3) {
  throw new Error('Please provide an base directory as parameter.');
}

const directoryParam = process.argv[2];
const baseDirectory = path.join(cwd, directoryParam);

console.log(renderPage(baseDirectory));
