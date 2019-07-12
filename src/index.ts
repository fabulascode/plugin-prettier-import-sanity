import { parser } from './parser';
const { concat, hardline } = require('prettier').doc.builders;

const languages = [
  { extensions: ['.js'], name: 'JavaScript', parsers: ['babel-custom'] },
];

const parsers = {
  'babel-custom': {
    parse: parser,
    astFormat: 'babel-ast',
  },
};

function printJS(path: any, _, print: any) {
  return concat([path.call(print, 'value'), hardline]);
}

const printers = {
  'babel-ast': {
    print: printJS,
  },
};

module.exports = {
  languages,
  parsers,
  printers,
};
