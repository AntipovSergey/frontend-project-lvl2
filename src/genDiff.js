import parseFile from './parsers.js';
import getFormatDiff from './formatters/index.js';
import calcDiff from './calcDiff.js';
import readFile from './readFile.js';
import getFileExtention from './getFileExtention.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const firstObjectContent = readFile(file1);
  const secondObjectContent = readFile(file2);

  const firstObjectExtention = getFileExtention(file1);
  const secondObjectExtention = getFileExtention(file2);

  const firstObject = parseFile(firstObjectExtention, firstObjectContent);
  const secondObject = parseFile(secondObjectExtention, secondObjectContent);

  const diff = calcDiff(firstObject, secondObject);

  const result = getFormatDiff(diff, format);

  return result;
};

export default genDiff;
