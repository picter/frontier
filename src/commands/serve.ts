import * as process from 'process';
import * as program from 'commander';

program
  .parse(process.argv);

import '../server';
