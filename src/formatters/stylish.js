import _ from 'lodash';

const setIndent = (treeDepth, spaceCounts) => {
  const replacer = '  ';

  if (spaceCounts === 1) {
    const indentSize = treeDepth > 1 ? (treeDepth * 2) - 1 : treeDepth;

    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCounts);

    return { currentIndent, bracketIndent };
  }
  const indentSize = spaceCounts * treeDepth;

  const currentIndent = replacer.repeat(indentSize + 2);
  const bracketIndent = replacer.repeat(indentSize);

  return { currentIndent, bracketIndent };
};

const stringify = (data, depth) => {
  const iter = (node, innerDepth) => {
    const { currentIndent, bracketIndent } = setIndent(innerDepth, 2);

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

const stylish = (data) => {
  const iter = (node, depth) => {
    const { currentIndent, bracketIndent } = setIndent(depth, 1);

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
