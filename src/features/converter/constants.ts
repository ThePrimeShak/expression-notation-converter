/** Binary operators supported in expressions */
export const BINARY_OPERATORS = ["+", "-", "*", "/", "^"];

/**
 * Operator precedence levels (higher number = higher precedence)
 * - Level 4: Exponentiation (^)
 * - Level 3: Multiplication and Division (*, /)
 * - Level 2: Addition and Subtraction (+, -)
 */
export const PRECEDENCE: Record<string, number> = {
  "^": 4,
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2,
};

/**
 * Right-associative operators (evaluated from right to left)
 * - Exponentiation (^): 2^3^4 = 2^(3^4)
 */
export const RIGHT_ASSOCIATIVE: Record<string, boolean> = {
  "^": true,
};
