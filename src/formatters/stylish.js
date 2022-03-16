import _ from 'lodash';

const stringify = (data, replacer = '  ', spaceCounts = 2) => {
  const iter = (node, depth) => {
    const indentSize = spaceCounts * depth;
    const currentIndent = replacer.repeat(indentSize + 2);
    const bracketIndent = replacer.repeat(indentSize);

    if (!_.isObject(node)) {
      return `${node}`;
    }
    const lines = Object
      .entries(node)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

const stylish = (data, replacer = '  ', spaceCounts = 1) => {
  const iter = (node, depth) => {
    const indentSize = depth > 1 ? (spaceCounts * depth * 2) - 1 : spaceCounts * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCounts);
    const lines = node.map(({
      name, value, oldValue, status, children,
    }) => {
      if (status === 'nested') {
        return `${currentIndent}  ${name}: ${iter(children, depth + 1)}`;
      }
      switch (status) {
        case 'deleted':
          return `${currentIndent}- ${name}: ${depth === 1 ? stringify(value) : stringify(value, '  ', 4)}`;
        case 'unchanged':
          return `${currentIndent}  ${name}: ${depth === 1 ? stringify(value) : stringify(value, '  ', 4)}`;
        case 'added':
          return `${currentIndent}+ ${name}: ${depth === 1 ? stringify(value) : stringify(value, '  ', 4)}`;
        case 'updated':
          return `${currentIndent}- ${name}: ${depth === 1 ? stringify(oldValue) : stringify(oldValue, '  ', 4)}\n${currentIndent}+ ${name}: ${depth === 1 ? stringify(value) : stringify(value, '  ', 4)}`;
        default:
          throw new Error(`There is no such ${status}`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
