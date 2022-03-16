import parsers from './src/parsers.js';
import getFormatDiff from './src/formatters/index.js';
import calcDiff from './src/calcDiff.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const firstObject = parsers(file1);
  const secondObject = parsers(file2);
  const diff = calcDiff(firstObject, secondObject);
  const result = getFormatDiff(diff, format);
  return result;
};

export default genDiff;
