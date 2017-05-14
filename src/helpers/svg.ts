import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as ltx from 'ltx';

const cwd = process.cwd();

const parse = xml => {
  const svg = ltx.parse(xml);

  if (svg.name !== 'svg') {
    throw new TypeError('Input must be an SVG');
  }

  delete svg.attrs.xmlns;
  delete svg.attrs['xmlns:xlink'];

  return svg;
};

const svg = (source, options) => {
  const filePath = path.join(cwd, 'source', source);
  const content = fs.readFileSync(filePath, 'utf-8');
  const svg = parse(content);
  return new handlebars.SafeString(svg.root().toString());
};


export default svg;
