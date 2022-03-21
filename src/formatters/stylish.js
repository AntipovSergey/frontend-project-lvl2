import _ from 'lodash';

const setStringifyIndent = (treeDepth, replacerType, spaceCounts) => {
  const indentSize = spaceCounts * treeDepth;

  const currentIndent = replacerType.repeat(indentSize + 2);

  const bracketIndent = replacerType.repeat(indentSize);

  return { currentIndent, bracketIndent };
};

const stringify = (data, depth, spaceCounts = 2) => {
  const replacer = '  ';

  const iter = (node, innerDepth) => {
    const { currentIndent, bracketIndent } = setStringifyIndent(innerDepth, replacer, spaceCounts);

    if (!_.isObject(node)) {
      return `${node}`;
    }

    const lines = Object
      .entries(node)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, innerDepth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, depth);
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
      if (status === 'nested') {
        return `${currentIndent}  ${name}: ${iter(children, depth + 1)}`;
      }
      switch (status) {
        case 'deleted':
          return `${currentIndent}- ${name}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${name}: ${stringify(value, depth)}`;
        case 'added':
          return `${currentIndent}+ ${name}: ${stringify(value, depth)}`;
        case 'updated':
          return `${currentIndent}- ${name}: ${stringify(oldValue, depth)}\n${currentIndent}+ ${name}: ${stringify(value, depth)}`;
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
