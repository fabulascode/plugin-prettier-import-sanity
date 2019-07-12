import { AST, CustomParser } from 'prettier';
import jscs, {
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
} from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';
import { compareNames } from './utils';

export const parser: CustomParser = (text: string, { babel }, {}): AST => {
  const root = jscs(text);
  const importStatementMap: { [index: string]: ImportDeclaration } = {};
  const importStatements: Collection<ImportDeclaration> = root.find(
    ImportDeclaration,
    {}
  );

  importStatements.forEach(statement => {
    const orderedSpecifiers: Array<
      ImportDefaultSpecifier | ImportSpecifier | ImportNamespaceSpecifier
    > = [];
    const specifierMap: { [index: string]: ImportSpecifier } = {};
    const { node } = statement;
    const { specifiers } = node;

    if (!specifiers || specifiers.length === 0) {
      throw new Error('No specifiers found for import declaration');
    }

    if (specifiers.length === 1) {
      orderedSpecifiers.push(specifiers[0]);
    } else {
      specifiers.forEach(specifier => {
        const { type } = specifier;
        if (type === 'ImportDefaultSpecifier') {
          orderedSpecifiers.push(specifier);
        } else if (type === 'ImportSpecifier') {
          if (specifier.local && specifier.local.name !== null) {
            const { name } = specifier.local;
            specifierMap[name] = specifier as ImportSpecifier;
          }
        } else if (type === 'ImportNamespaceSpecifier') {
          console.log(specifier);
        }
      });
    }

    Object.keys(specifierMap)
      .sort()
      .forEach(name => {
        orderedSpecifiers.push(specifierMap[name]);
      });
    statement.node.specifiers = orderedSpecifiers;

    if (orderedSpecifiers.length > 0 && orderedSpecifiers[0].local !== null) {
      const { name } = orderedSpecifiers[0].local;
      importStatementMap[name] = statement.node;
    }
  });

  let importNames = Object.keys(importStatementMap).sort(compareNames);

  if (importNames.includes('React')) {
    importNames = importNames.filter(name => name !== 'React');
    importNames.unshift('React');
  }

  root.find(ImportDeclaration, {}).replaceWith((_, i: number) => {
    const importName = importNames[i];
    const newNode = importStatementMap[importName];
    return jscs.importDeclaration(newNode.specifiers, newNode.source);
  });

  const AST = babel(root.toSource(), {
    allowImportExportEverywhere: true,
  });

  return AST;
};
