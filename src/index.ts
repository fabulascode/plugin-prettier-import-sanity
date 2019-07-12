import { parser } from './parser';
import { printer } from './printer';

export const defaultOptions = {};

export const languages = [
  {
    name: 'JavaScript',
    extensions: ['.js'],
    parsers: ['insanity-parse'],
  },
];

export const parsers = {
  'insanity-parse': {
    parse: parser,
    astFormat: 'insanity-ast',
  },
};

export const printers = {
  'insanity-ast': {
    print: printer,
  },
};

const options = {};

module.exports = {
  printers,
  parsers,
  languages,
  defaultOptions,
  options,
};
