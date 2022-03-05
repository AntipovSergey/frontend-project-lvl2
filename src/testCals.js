import _ from 'lodash';
import parsers from './parsers.js';

const firstObject1 = parsers('file3.json');
const secondObject2 = parsers('file4.json');

const calcDiff = (firstObject, secondObject) => {
  const keysFirst = Object.keys(firstObject);
  const keysSecond = Object.keys(secondObject);
  const allKeys = _.union(keysFirst, keysSecond).sort();

  const result = allKeys.reduce((acc, key) => {
    const value1 = firstObject[key];
    const value2 = secondObject[key];
    if (!(_.isObject(value1) && _.isObject(value2))) {
      if (_.has(firstObject, key) && _.has(secondObject, key)) {
        if (firstObject[key] === secondObject[key]) {
          return { ...acc, [`  ${[key]}`]: value1 };
        } if (firstObject[key] !== secondObject[key]) {
          return ({ ...acc, [`- ${[key]}`]: value1, [`+ ${[key]}`]: value2 });
        }
      } else if (_.has(firstObject, key) && !_.has(secondObject, key)) {
        return { ...acc, [`- ${[key]}`]: value1 };
      } else if (!_.has(firstObject, key) && _.has(secondObject, key)) {
        return { ...acc, [`+ ${[key]}`]: value2 };
      }
    } if (_.has(firstObject, key) && _.has(secondObject, key)) {
      return { ...acc, [`  ${[key]}`]: { ...calcDiff(value1, value2) } };
    }

    return acc;
  }, {});

  return result;
};

console.log(calcDiff(firstObject1, secondObject2));
