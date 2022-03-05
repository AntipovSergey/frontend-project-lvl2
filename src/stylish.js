import _ from 'lodash';

const stylish = (value, replacer = ' ', spaceCounts = 2) => {
  const iter = (node, depth) => {
    if (node !== Object(node)) {
      return `${node}`;
    }

    const indentSize = spaceCounts * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCounts);
    const lines = Object
      .entries(node)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 2)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

// const stylish = (value, replacer = ' ', spaceCounts = 1) => {
//   const iter = (node, depth) => {
//     if (!_.isObject(node)) {
//       return `${node}`;
//     }

//     const indentSize = spaceCounts * depth;
//     const currentIndent = replacer.repeat(indentSize);
//     const bracketIndent = replacer.repeat(indentSize - spaceCounts);
//     const lines = Object
//       .entries(node)
//       .map(([key, val]) => {
//         if (!Object(val)) {
//           return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
//         } return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
//       });
//     return [
//       '{',
//       ...lines,
//       `${bracketIndent}}`,
//     ].join('\n');
//   };

//   return iter(value, 2);
// };

export default stylish;
