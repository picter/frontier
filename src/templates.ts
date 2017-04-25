import * as fs from 'fs';
import * as path from 'path';

// Templates
const templateDirectory = path.join(process.cwd(), 'templates');
const allTemplates = fs.readdirSync(templateDirectory);

const templates = allTemplates.filter(
  template => !['index.hbs'].includes(template),
);

export default templates;
