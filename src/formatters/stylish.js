import _ from 'lodash';

const setStringifyIndent = (treeDepth, replacerType, spaceCounts) => {
  const indentSize = spaceCounts * treeDepth;

  const currentIndent = replacerType.repeat(indentSize + 2);

  const bracketIndent = replacerType.repeat(indentSize);

  return { currentIndent, bracketIndent };
};

const stringify = (data, spaceCounts = 2) => {
  const replacer = '  ';

  const iter = (node, depth) => {
    const { currentIndent, bracketIndent } = setStringifyIndent(depth, replacer, spaceCounts);

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

const setStylishIndent = (treeDepth, replacerType, spaceCounts) => {
  const indentSize = treeDepth > 1 ? (spaceCounts * treeDepth * 2) - 1 : spaceCounts * treeDepth;

  const currentIndent = replacerType.repeat(indentSize);

  const bracketIndent = replacerType.repeat(indentSize - spaceCounts);

  return { currentIndent, bracketIndent };
};

const stylish = (data, spaceCounts = 1) => {
  const replacer = '  ';

  const iter = (node, depth) => {
    const { currentIndent, bracketIndent } = setStylishIndent(depth, replacer, spaceCounts);

    const lines = node.map(({
      name, value, oldValue, status, children,
    }) => {
      const getCurrentValue = (currentDepth, currentValue) => {
        const result = currentDepth === 1 ? stringify(currentValue) : stringify(currentValue, 4);
        return result;
      };
      if (status === 'nested') {
        return `${currentIndent}  ${name}: ${iter(children, depth + 1)}`;
      }
      switch (status) {
        case 'deleted':
          return `${currentIndent}- ${name}: ${getCurrentValue(depth, value)}`;
        case 'unchanged':
          return `${currentIndent}  ${name}: ${getCurrentValue(depth, value)}`;
        case 'added':
          return `${currentIndent}+ ${name}: ${getCurrentValue(depth, value)}`;
        case 'updated':
          return `${currentIndent}- ${name}: ${getCurrentValue(depth, oldValue)}\n${currentIndent}+ ${name}: ${getCurrentValue(depth, value)}`;
        default:
          throw new Error(`There is no such status ${status}`);
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
