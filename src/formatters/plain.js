import _ from 'lodash';
import path from 'path';

const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (value) => {
  console.log('--------------------------------------------------------');
  console.log(Object.entries(value));
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const lines = Object
      .entries(node)
      .reduce((acc, [key, val]) => {
        if (key.startsWith('+')) {
          acc += `Property '${key.slice(2)}' was added with value: ${iter(stringify(val), depth + 1)}\n`;
        } if (key.startsWith('-')) {
          acc += `Property '${key.slice(2)}' was removed\n`;
        } if (key.startsWith(' ')) {
          acc += `Property '${key.slice(2)}' was removed\n`;
        }
        return acc;
      }, '');
    return lines;
  };
  return iter(value, 1);
};

export default plain;
