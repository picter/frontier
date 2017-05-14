import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

import svg from '../helpers/svg';

handlebars.registerHelper('svg', svg);

const cwd = process.cwd();

export const renderJsonFile = (template, content) => {
  const templatePath = path.join(cwd, 'templates', template + '.hbs');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const templateHbs = handlebars.compile(templateContent);
  return templateHbs(content);
};

export default fileContent => {
  const { template, content } = JSON.parse(fileContent);
  return renderJsonFile(template, content);
};
