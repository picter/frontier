import * as process from 'process';
import * as program from 'commander';

program
  .usage('[options] <path>')
  .parse(process.argv);

console.log(program.args);
