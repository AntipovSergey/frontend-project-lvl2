import _ from 'lodash';

const stringify = (value) => {
  const formattedValue = _.isObject(value) ? '[complex value]' : value;
  if (_.isString(value)) {
    return `'${value}'`;
  } return formattedValue;
};

const plain = (data) => {
  const iter = (node, ancestry) => {
    const lines = node.map(({
      name,
      value,
      oldValue = null,
      status,
      children = null,
    }) => {
      switch (status) {
        case 'nested':
          return iter(children, `${ancestry}${name}.`);
        case 'deleted':
          return `Property '${ancestry}${name}' was removed`;
        case 'unchanged':
          break;
        case 'added':
          return `Property '${ancestry}${name}' was added with value: ${stringify(value)}`;
        case 'updated':
          return `Property '${ancestry}${name}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;
        default:
          throw new Error(`There is no such status: ${status}`);
      }
      return null;
    });
    return [
      ...lines,
    ].filter((item) => item !== null).join('\n');
  };
  return iter(data, '');
};

export default plain;
