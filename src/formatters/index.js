import stylish from './stylish.js';
import plain from './plain.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }

  return '';
};

export default getFormatDiff;
