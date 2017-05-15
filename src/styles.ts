import * as sass from 'node-sass';

export const renderStylesheet = (fileName) =>
  sass.renderSync({
    file: fileName,
  }).css;
