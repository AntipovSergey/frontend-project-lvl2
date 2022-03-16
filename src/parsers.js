import * as path from 'path';
import * as yaml from 'js-yaml';

const parseFile = (filename, data) => {
  const fileExtension = path.extname(filename);

  if (fileExtension === '.json') {
    return JSON.parse(data);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(data);
  }

  return null;
};

export default parseFile;
