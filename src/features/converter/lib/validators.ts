import { BINARY_OPERATORS } from "@/features/converter/constants";
import type {
  Notation,
  StackState,
  ValidationResult,
} from "@/features/converter/types";

import { isOperand } from "./expression";
import { tokenize } from "./tokenize";

function createStep(
  stack: string[],
  action: string,
  stepIndex: number
): StackState {
  return { snapshot: [...stack], action, stepIndex };
}

function validateStackNotation(
  input: string,
  notation: Exclude<Notation, "infix">
): ValidationResult {
  const inputTokens = tokenize(input);
  const tokens = notation === "prefix" ? inputTokens.reverse() : inputTokens;
  const stackTrace: StackState[] = [];
  const stack: string[] = [];
  let stepIndex = 0;

  if (tokens.length === 0) {
    return { valid: false, error: "Expression is empty", stackTrace };
  }

  for (const token of tokens) {
    if (isOperand(token)) {
      stack.push(token);
      stackTrace.push(createStep(stack, `push ${token}`, stepIndex++));
      continue;
    }

    if (!BINARY_OPERATORS.includes(token)) {
      return { valid: false, error: `Unknown token: '${token}'`, stackTrace };
    }

    if (stack.length < 2) {
      return {
        valid: false,
        error: `Operator '${token}' requires 2 operands but stack has ${stack.length}`,
        stackTrace,
      };
    }

    const firstOperand = stack.pop()!;
    const secondOperand = stack.pop()!;
    stackTrace.push(
      createStep(
        stack,
        `pop ${firstOperand}; pop ${secondOperand} (apply ${token})`,
        stepIndex++
      )
    );

    stack.push("(result)");
    stackTrace.push(createStep(stack, "push (result)", stepIndex++));
  }

  if (stack.length !== 1) {
    const label = `${notation[0].toUpperCase()}${notation.slice(1)}`;
    return {
      valid: false,
      error: `${label} expression must resolve to exactly 1 result, but has ${stack.length}`,
      stackTrace,
    };
  }

  return { valid: true, stackTrace };
}

export function validatePostfix(input: string): ValidationResult {
  return validateStackNotation(input, "postfix");
}

export function validatePrefix(input: string): ValidationResult {
  return validateStackNotation(input, "prefix");
}

export function validateInfix(input: string): ValidationResult {
  const tokens = tokenize(input);
  const stackTrace: StackState[] = [];
  const parentheses: string[] = [];
  let expectsOperand = true;
  let stepIndex = 0;

  if (tokens.length === 0) {
    return { valid: false, error: "Expression is empty", stackTrace };
  }

  for (const token of tokens) {
    if (isOperand(token)) {
      if (!expectsOperand) {
        return {
          valid: false,
          error: `Missing operator before '${token}'`,
          stackTrace,
        };
      }

      expectsOperand = false;
      stackTrace.push(createStep(parentheses, `read ${token}`, stepIndex++));
      continue;
    }

    if (token === "(") {
      if (!expectsOperand) {
        return {
          valid: false,
          error: "Missing operator before '('",
          stackTrace,
        };
      }

      parentheses.push(token);
      stackTrace.push(createStep(parentheses, "push (", stepIndex++));
      continue;
    }

    if (token === ")") {
      if (expectsOperand) {
        return {
          valid: false,
          error: "Unexpected ')' after an operator or empty group",
          stackTrace,
        };
      }
      if (parentheses.length === 0) {
        return { valid: false, error: "Unmatched ')'", stackTrace };
      }

      parentheses.pop();
      stackTrace.push(createStep(parentheses, "match )", stepIndex++));
      expectsOperand = false;
      continue;
    }

    if (BINARY_OPERATORS.includes(token)) {
      if (expectsOperand) {
        return {
          valid: false,
          error: `Operator '${token}' is in an invalid position`,
          stackTrace,
        };
      }

      expectsOperand = true;
      stackTrace.push(createStep(parentheses, `read ${token}`, stepIndex++));
      continue;
    }

    return { valid: false, error: `Unknown token: '${token}'`, stackTrace };
  }

  if (parentheses.length > 0) {
    return { valid: false, error: "Unmatched '('", stackTrace };
  }
  if (expectsOperand) {
    return {
      valid: false,
      error: "Expression cannot end with an operator",
      stackTrace,
    };
  }

  return { valid: true, stackTrace };
}
