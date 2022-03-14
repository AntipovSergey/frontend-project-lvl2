import parsers from './parsers.js';
import getFormatDiff from './formatters/index.js';
import calcDiff from './calcDiff.js';

const genDiff = (file1, file2, format = 'plain') => {
  const firstObject = parsers(file1);
  const secondObject = parsers(file2);
  const diff = calcDiff(firstObject, secondObject);
  const result = getFormatDiff(diff, format);
  return result;
};

export default genDiff;
