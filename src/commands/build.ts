import * as process from 'process';
import * as path from 'path';
import * as program from 'commander';

import { renderPage } from '../renderer';

const cwd = process.cwd();

program
  .usage('[options] <path>')
  .parse(process.argv);

const directoryParam = program.args[0] || '.';
const baseDirectory = path.join(cwd, directoryParam);

console.log(renderPage(baseDirectory));
