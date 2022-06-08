import formatJSON from './json.js';
import formatPlain from './plain.js';
import formatStylish from './stylish.js';

export default (outputFormat, ast) => {
  switch (outputFormat) {
    case 'plain':
      return formatPlain(ast);
    case 'json':
      return formatJSON(ast);
    default:
      return formatStylish(ast);
  }
};