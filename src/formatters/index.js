import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'JSON') {
    return json(diff);
  }

  return '';
};

export default getFormatDiff;
