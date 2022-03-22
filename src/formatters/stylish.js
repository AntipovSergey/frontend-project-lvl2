import _ from 'lodash';

const setIndent = (treeDepth, spaceCounts) => {
  const replacer = '  ';

  const indentSize = treeDepth > 1 ? (spaceCounts * treeDepth * 2) - 1 : spaceCounts * treeDepth;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spaceCounts);

  const innerIndentSize = spaceCounts * treeDepth;
  const innerCurrentIndent = replacer.repeat(innerIndentSize + 2);
  const innerBracketIndent = replacer.repeat(innerIndentSize);

  return {
    currentIndent,
    bracketIndent,
    innerCurrentIndent,
    innerBracketIndent,
  };
};

const stringify = (data, depth, spaceCounts = 2) => {
  const iter = (node, innerDepth) => {
    const { innerCurrentIndent, innerBracketIndent } = setIndent(innerDepth, spaceCounts);

    if (!_.isObject(node)) {
      return `${node}`;
    }

    const lines = Object
      .entries(node)
      .map(([key, val]) => `${innerCurrentIndent}${key}: ${iter(val, innerDepth + 1)}`);
    return [
      '{',
      ...lines,
      `${innerBracketIndent}}`,
    ].join('\n');
  };

  return iter(data, depth);
};

const stylish = (data, spaceCounts = 1) => {
  const iter = (node, depth) => {
    const { currentIndent, bracketIndent } = setIndent(depth, spaceCounts);

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
