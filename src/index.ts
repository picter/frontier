import * as winston from 'winston';
import * as process from 'process';

winston.level = 'debug';

winston.debug(process.argv);
