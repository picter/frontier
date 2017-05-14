import * as winston from 'winston';
import * as process from 'process';
import * as program from 'commander';

const packageJson = require('../package.json');

winston.level = 'debug';

program
  .version(packageJson.version)
  .parse(process.argv);
