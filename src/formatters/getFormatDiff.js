import stylish from './stylish.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }

  return '';
};

export default getFormatDiff;
