import * as process from 'process';
import * as path from 'path';
import * as program from 'commander';
import * as winston from 'winston';

import { renderPage } from '../renderer';

winston.level = 'debug';

const cwd = process.cwd();

program
  .usage('[options] <path>')
  .parse(process.argv);

const directoryParam = program.args[0] || 'source';
const baseDirectory = path.join(cwd, directoryParam);

renderPage(baseDirectory, { recursive: true });
