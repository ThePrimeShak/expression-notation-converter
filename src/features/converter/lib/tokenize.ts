/**
 * Tokenizes input string into array of tokens
 * Supports expressions with or without spaces
 * Handles operators, parentheses, numbers, and variables
 */
const WHITESPACE_PATTERN = /\s/;

export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let currentToken = "";

  const pushCurrentToken = () => {
    if (currentToken) {
      tokens.push(currentToken);
      currentToken = "";
    }
  };

  const operators = "+-*/^";
  const parentheses = "()";

  for (const char of input) {
    // Treat any whitespace as a token separator.
    if (WHITESPACE_PATTERN.test(char)) {
      pushCurrentToken();
      continue;
    }

    // Handle parentheses
    if (parentheses.includes(char)) {
      pushCurrentToken();
      tokens.push(char);
      continue;
    }

    // Handle operators
    if (operators.includes(char)) {
      pushCurrentToken();
      tokens.push(char);
      continue;
    }

    // Build multi-character tokens (numbers, variables)
    currentToken += char;
  }

  pushCurrentToken();
  return tokens;
}
