import parsers from './parsers.js';
import stylish from './stylish.js';
import calcDiff from './calcDiff.js';

const genDiff = (file1, file2) => {
  const firstObject = parsers(file1);
  const secondObject = parsers(file2);
  const diff = calcDiff(firstObject, secondObject);
  const result = stylish(diff);
  return result;
};

export default genDiff;
