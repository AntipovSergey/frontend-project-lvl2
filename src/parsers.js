import * as yaml from 'js-yaml';

const parseFile = (parcingFormat, data) => {
  switch (parcingFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extention '${parcingFormat}'!`);
  }
};

export default parseFile;
