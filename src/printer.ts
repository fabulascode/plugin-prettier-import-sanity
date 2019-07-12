import { FastPath } from 'prettier';
import generate from '@babel/generator';
// const { concat } = require('prettier').doc.builders;

export const printer = (path: FastPath, _: any) => {
  const node = path.getValue();

  console.log('\n*** AFTER *** \n\n', generate(node).code);
  return generate(node).code;
};
