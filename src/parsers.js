import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const parsers = (filename) => {
  const fileExtension = path.extname(filename);
  const filePath = path.resolve(process.cwd(), '__fixtures__', filename);
  const file = fs.readFileSync(filePath, 'utf-8');
  if (fileExtension === '.json') {
    return JSON.parse(file);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(file);
  }

  return null;
};

export default parsers;
