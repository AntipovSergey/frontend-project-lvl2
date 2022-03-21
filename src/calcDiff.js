import _ from 'lodash';

const calcDiff = (firstObject, secondObject) => {
  const allKeys = _.sortBy(_.union(_.keys(firstObject), _.keys(secondObject)));

  const result = allKeys.map((key) => {
    const value1 = firstObject[key];

    const value2 = secondObject[key];

    if (!(_.isObject(value1) && _.isObject(value2))) {
      if (!_.has(firstObject, key)) {
        return { name: key, value: value2, status: 'added' };
      } if (!_.has(secondObject, key)) {
        return { name: key, value: value1, status: 'deleted' };
      } if (!_.isEqual(value1, value2)) {
        return {
          name: key, value: value2, oldValue: value1, status: 'updated',
        };
      } return { name: key, value: value1, status: 'unchanged' };
    } return { name: key, status: 'nested', children: calcDiff(value1, value2) };
  });
  return result;
};

export default calcDiff;
