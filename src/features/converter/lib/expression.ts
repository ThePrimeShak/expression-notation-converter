const NUMBER_PATTERN = /^(?:\d+(?:\.\d*)?|\.\d+)$/;
const IDENTIFIER_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** Returns true when a token can be used as an expression operand. */
export function isOperand(token: string): boolean {
  return NUMBER_PATTERN.test(token) || IDENTIFIER_PATTERN.test(token);
}

/** Adds parentheses only when an operand is already a compound expression. */
export function wrapCompoundExpression(expression: string): string {
  return expression.includes(" ") ? `( ${expression} )` : expression;
}
