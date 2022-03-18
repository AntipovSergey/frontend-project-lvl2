import * as yaml from 'js-yaml';

const parseFile = (fileExtension, data) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extention '${fileExtension}'!`);
  }
};

export default parseFile;
