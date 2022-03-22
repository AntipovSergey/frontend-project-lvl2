import * as yaml from 'js-yaml';

const parseFile = (parcingFormat, data) => {
  switch (parcingFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown parcing format: '${parcingFormat}'!`);
  }
};

export default parseFile;
