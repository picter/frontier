import * as autoprefixer from 'autoprefixer';
import * as postcss from 'postcss';
import * as sass from 'node-sass';

const prefixer = postcss([autoprefixer]);

export const renderStylesheet = async fileName =>
  await prefixer.process(
    sass.renderSync({
      file: fileName,
    }).css.toString(),
  ).css;
