import * as winston from 'winston';
import * as process from 'process';
import * as program from 'commander';

const packageJson = require('../package.json');

winston.level = 'debug';

program
  .version(packageJson.version)
  .command('build', 'Builds your page and places result in output path.')
  .command('serve', 'Builds and serves your page with live reload.', { isDefault: true })
  .parse(process.argv);
