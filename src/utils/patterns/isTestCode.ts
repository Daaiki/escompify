import { NodePath, types as t } from '@babel/core';

export function isTestCode(path: NodePath<t.Node>) {
  if (!t.isCallExpression(path.node)) return false;

  const {
    callee,
    arguments: [arg1, arg2]
  } = path.node;

  if (!t.isIdentifier(callee)) return false;

  const calleeName = callee.name;
  const testFunctionNames = ['it', 'test', 'describe'];

  return (
    testFunctionNames.includes(calleeName) &&
    t.isStringLiteral(arg1) &&
    (t.isFunctionExpression(arg2) || t.isArrowFunctionExpression(arg2))
  );
}
