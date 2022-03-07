import _ from 'lodash';

const calcDiff = (firstObject, secondObject) => {
  const allKeys = _.sortBy(_.union(_.keys(firstObject), _.keys(secondObject)));

  const result = allKeys.reduce((acc, key) => {
    const value1 = firstObject[key];
    const value2 = secondObject[key];
    if (!(_.isObject(value1) && _.isObject(value2))) {
      if (_.has(firstObject, key) && _.has(secondObject, key)) {
        if (value1 === value2) {
          return { ...acc, [`  ${[key]}`]: value1 };
        } if (value1 !== value2) {
          return ({ ...acc, [`- ${[key]}`]: value1, [`+ ${[key]}`]: value2 });
        }
      } else if (_.has(firstObject, key) && !_.has(secondObject, key)) {
        return { ...acc, [`- ${[key]}`]: value1 };
      } else if (!_.has(firstObject, key) && _.has(secondObject, key)) {
        return { ...acc, [`+ ${[key]}`]: value2 };
      }
    } return { ...acc, [`  ${[key]}`]: { ...calcDiff(value1, value2) } };
  }, {});

  return result;
};

export default calcDiff;
