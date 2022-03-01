import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (file1, file2) => {
  const firstObject = parsers(file1);
  const secondObject = parsers(file2);
  const keysFirst = Object.keys(firstObject);
  const keysSecond = Object.keys(secondObject);
  const allKeys = _.union(keysFirst, keysSecond).sort();
  const result = {};

  allKeys.forEach((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        result[`  ${[key]}`] = firstObject[key];
      } else if (firstObject[key] !== secondObject[key]) {
        result[`- ${[key]}`] = firstObject[key];
        result[`+ ${[key]}`] = secondObject[key];
      }
    } else if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result[`- ${[key]}`] = firstObject[key];
    } else if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result[`+ ${[key]}`] = secondObject[key];
    }
  });

  return `{\n${Object.entries(result).map((item) => `  ${item.join(': ')}`).join('\n')}\n}`;
};

export default genDiff;
