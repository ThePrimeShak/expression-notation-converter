import {
  BINARY_OPERATORS,
  PRECEDENCE,
  RIGHT_ASSOCIATIVE,
} from "@/features/converter/constants";
import type { ConversionResult, StackState } from "@/features/converter/types";

import { isOperand, wrapCompoundExpression } from "./expression";
import { tokenize } from "./tokenize";

function createStep(
  stack: string[],
  action: string,
  stepIndex: number,
  operatorStack?: string[]
): StackState {
  return {
    snapshot: [...stack],
    operatorStack: operatorStack ? [...operatorStack] : undefined,
    action,
    stepIndex,
  };
}

export function infixToPostfix(input: string): ConversionResult {
  const tokens = tokenize(input);
  const output: string[] = [];
  const operatorStack: string[] = [];
  const steps: StackState[] = [];
  let stepIndex = 0;

  const getTopOperator = () => operatorStack[operatorStack.length - 1];

  for (const token of tokens) {
    if (isOperand(token)) {
      output.push(token);
      steps.push(
        createStep(output, `add ${token} to output`, stepIndex++, operatorStack)
      );
      continue;
    }

    if (token === "(") {
      operatorStack.push(token);
      steps.push(
        createStep(
          output,
          `push ( to operator stack`,
          stepIndex++,
          operatorStack
        )
      );
      continue;
    }

    if (token === ")") {
      // First, show that we're processing the closing parenthesis
      steps.push(
        createStep(
          output,
          `process ) - pop until matching (`,
          stepIndex++,
          operatorStack
        )
      );

      while (operatorStack.length && getTopOperator() !== "(") {
        const operator = operatorStack.pop()!;
        output.push(operator);
        steps.push(
          createStep(
            output,
            `move ${operator} to output`,
            stepIndex++,
            operatorStack
          )
        );
      }
      operatorStack.pop(); // Remove '('
      steps.push(
        createStep(
          output,
          `remove matching ( from operator stack`,
          stepIndex++,
          operatorStack
        )
      );
      continue;
    }

    // Handle operator
    while (
      operatorStack.length &&
      getTopOperator() !== "(" &&
      (PRECEDENCE[getTopOperator()] > PRECEDENCE[token] ||
        (PRECEDENCE[getTopOperator()] === PRECEDENCE[token] &&
          !RIGHT_ASSOCIATIVE[token]))
    ) {
      const operator = operatorStack.pop()!;
      output.push(operator);
      steps.push(
        createStep(
          output,
          `move ${operator} to output`,
          stepIndex++,
          operatorStack
        )
      );
    }

    operatorStack.push(token);
    steps.push(
      createStep(
        output,
        `push ${token} to operator stack`,
        stepIndex++,
        operatorStack
      )
    );
  }

  // Pop remaining operators (skip parentheses)
  while (operatorStack.length) {
    const operator = operatorStack.pop()!;
    if (BINARY_OPERATORS.includes(operator)) {
      output.push(operator);
      steps.push(
        createStep(
          output,
          `move ${operator} to output`,
          stepIndex++,
          operatorStack
        )
      );
    }
  }

  return { result: output.join(" "), steps };
}

export function infixToPrefix(input: string): ConversionResult {
  // Algorithm: Reverse tokens, swap parentheses, modify associativity, convert to postfix, reverse result
  const tokens = tokenize(input).reverse();
  const output: string[] = [];
  const operatorStack: string[] = [];
  const steps: StackState[] = [];
  let stepIndex = 0;

  const getTopOperator = () => operatorStack[operatorStack.length - 1];

  for (const token of tokens) {
    if (isOperand(token)) {
      output.push(token);
      steps.push(
        createStep(output, `add ${token} to output`, stepIndex++, operatorStack)
      );
      continue;
    }

    if (token === ")") {
      operatorStack.push(token);
      steps.push(
        createStep(
          output,
          `push ) to operator stack`,
          stepIndex++,
          operatorStack
        )
      );
      continue;
    }

    if (token === "(") {
      // First, show that we're processing the opening parenthesis
      steps.push(
        createStep(
          output,
          `process ( - pop until matching )`,
          stepIndex++,
          operatorStack
        )
      );

      while (operatorStack.length && getTopOperator() !== ")") {
        const operator = operatorStack.pop()!;
        if (BINARY_OPERATORS.includes(operator)) {
          output.push(operator);
          steps.push(
            createStep(
              output,
              `move ${operator} to output`,
              stepIndex++,
              operatorStack
            )
          );
        }
      }
      operatorStack.pop(); // Remove ')'
      steps.push(
        createStep(
          output,
          `remove matching ) from operator stack`,
          stepIndex++,
          operatorStack
        )
      );
      continue;
    }

    // Handle operator - note reversed comparison for prefix
    if (BINARY_OPERATORS.includes(token)) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== ")" &&
        BINARY_OPERATORS.includes(operatorStack[operatorStack.length - 1]) &&
        (PRECEDENCE[operatorStack[operatorStack.length - 1]] >
          PRECEDENCE[token] ||
          (PRECEDENCE[operatorStack[operatorStack.length - 1]] ===
            PRECEDENCE[token] &&
            RIGHT_ASSOCIATIVE[token]))
      ) {
        const operator = operatorStack.pop()!;
        output.push(operator);
        steps.push(
          createStep(
            output,
            `move ${operator} to output`,
            stepIndex++,
            operatorStack
          )
        );
      }

      operatorStack.push(token);
      steps.push(
        createStep(
          output,
          `push ${token} to operator stack`,
          stepIndex++,
          operatorStack
        )
      );
    }
  }

  // Pop remaining operators (skip parentheses)
  while (operatorStack.length) {
    const operator = operatorStack.pop()!;
    if (BINARY_OPERATORS.includes(operator)) {
      output.push(operator);
      steps.push(
        createStep(
          output,
          `move ${operator} to output`,
          stepIndex++,
          operatorStack
        )
      );
    }
  }

  // Filter out any parentheses that might have slipped through
  const cleanOutput = output.filter(
    (token) => isOperand(token) || BINARY_OPERATORS.includes(token)
  );
  const prefixResult = cleanOutput.reverse().join(" ");
  return { result: prefixResult, steps };
}

type StackExpressionBuilder = (
  operator: string,
  leftOperand: string,
  rightOperand: string
) => string;

function convertStackExpression(
  input: string,
  direction: "left-to-right" | "right-to-left",
  buildExpression: StackExpressionBuilder
): ConversionResult {
  const inputTokens = tokenize(input);
  const tokens =
    direction === "right-to-left" ? inputTokens.reverse() : inputTokens;
  const stack: string[] = [];
  const steps: StackState[] = [];
  let stepIndex = 0;

  for (const token of tokens) {
    if (isOperand(token)) {
      stack.push(token);
      steps.push(createStep(stack, `push ${token}`, stepIndex++));
      continue;
    }

    if (!BINARY_OPERATORS.includes(token)) {
      return { error: `Unknown token: ${token}`, steps };
    }
    if (stack.length < 2) {
      return { error: `Operator ${token} requires 2 operands`, steps };
    }

    const firstPopped = stack.pop()!;
    steps.push(createStep(stack, `pop ${firstPopped}`, stepIndex++));

    const secondPopped = stack.pop()!;
    steps.push(createStep(stack, `pop ${secondPopped}`, stepIndex++));

    const [leftOperand, rightOperand] =
      direction === "left-to-right"
        ? [secondPopped, firstPopped]
        : [firstPopped, secondPopped];
    const expression = buildExpression(token, leftOperand, rightOperand);

    stack.push(expression);
    steps.push(createStep(stack, `push ${expression}`, stepIndex++));
  }

  if (stack.length !== 1) {
    return { error: "Expression did not resolve to a single result", steps };
  }

  return { result: stack[0], steps };
}

const buildInfixExpression: StackExpressionBuilder = (
  operator,
  leftOperand,
  rightOperand
) =>
  `${wrapCompoundExpression(leftOperand)} ${operator} ${wrapCompoundExpression(rightOperand)}`;

export function postfixToInfix(input: string): ConversionResult {
  return convertStackExpression(input, "left-to-right", buildInfixExpression);
}

export function prefixToInfix(input: string): ConversionResult {
  return convertStackExpression(input, "right-to-left", buildInfixExpression);
}

export function prefixToPostfix(input: string): ConversionResult {
  return convertStackExpression(
    input,
    "right-to-left",
    (operator, leftOperand, rightOperand) =>
      `${leftOperand} ${rightOperand} ${operator}`
  );
}

export function postfixToPrefix(input: string): ConversionResult {
  return convertStackExpression(
    input,
    "left-to-right",
    (operator, leftOperand, rightOperand) =>
      `${operator} ${leftOperand} ${rightOperand}`
  );
}
