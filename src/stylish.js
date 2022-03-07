const stylish = (value, replacer = '  ', spaceCounts = 1) => {
  const iter = (node, depth) => {
    if (node !== Object(node)) {
      return `${node}`;
    }

    const indentSize = spaceCounts * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCounts);
    const lines = Object
      .entries(node)
      .map(([key, val]) => {
        if (!(key.startsWith(' ') || key.startsWith('+') || key.startsWith('-'))) {
          return `${currentIndent}${replacer}${key}: ${iter(val, depth + 2)}`;
        } return `${currentIndent}${key}: ${iter(val, depth + 2)}`;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
