import _ from 'lodash';

const stringify = (value) => {
  if (!_.isString(value) || value === '[complex value]') {
    return value;
  } return `'${value}'`;
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
      const formattedValue = _.isObject(value) ? '[complex value]' : value;

      const formattedOldValue = _.isObject(oldValue) ? '[complex value]' : oldValue;

      switch (status) {
        case 'nested':
          return iter(children, `${ancestry}${name}.`);
        case 'deleted':
          return `Property '${ancestry}${name}' was removed`;
        case 'unchanged':
          break;
        case 'added':
          return `Property '${ancestry}${name}' was added with value: ${stringify(formattedValue)}`;
        case 'updated':
          return `Property '${ancestry}${name}' was updated. From ${stringify(formattedOldValue)} to ${stringify(formattedValue)}`;
        default:
          throw new Error(`There is no such status: ${status}`);
      }
      return null;
    });
    return [
      ...lines,
    ].join('\n').replace(/\n+/g, '\n');
  };
  return iter(data, '');
};

export default plain;
