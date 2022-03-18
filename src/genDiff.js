import parseFile from './parsers.js';
import getFormatDiff from './formatters/index.js';
import calcDiff from './calcDiff.js';
import readFile from './readFile.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const firstObjectContent = readFile(file1);
  const secondObjectContent = readFile(file2);
  const firstObject = parseFile(file1, firstObjectContent);
  const secondObject = parseFile(file2, secondObjectContent);
  const diff = calcDiff(firstObject, secondObject);
  const result = getFormatDiff(diff, format);
  return result;
};

export default genDiff;
