import type {
  ConversionOutcome,
  ConversionResult,
  ConversionResults,
  Notation,
  ValidationResult,
} from "@/features/converter/types";

import {
  infixToPostfix,
  infixToPrefix,
  postfixToInfix,
  postfixToPrefix,
  prefixToInfix,
  prefixToPostfix,
} from "./converters";
import { validateInfix, validatePostfix, validatePrefix } from "./validators";

type Validator = (input: string) => ValidationResult;

const VALIDATORS: Record<Notation, Validator> = {
  infix: validateInfix,
  postfix: validatePostfix,
  prefix: validatePrefix,
};

export function createEmptyResults(): ConversionResults {
  return {
    infix: { steps: [] },
    prefix: { steps: [] },
    postfix: { steps: [] },
  };
}

export function convertExpression(
  input: string,
  sourceNotation: Notation
): ConversionOutcome {
  const normalizedInput = input.trim();
  if (!normalizedInput) return { success: false, error: "Input is empty" };

  const validation = VALIDATORS[sourceNotation](normalizedInput);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error ?? `Invalid ${sourceNotation} expression`,
    };
  }

  const sourceResult: ConversionResult = {
    result: normalizedInput,
    steps: validation.stackTrace ?? [],
  };
  let results: ConversionResults;

  switch (sourceNotation) {
    case "infix":
      results = {
        infix: sourceResult,
        prefix: infixToPrefix(normalizedInput),
        postfix: infixToPostfix(normalizedInput),
      };
      break;
    case "prefix":
      results = {
        infix: prefixToInfix(normalizedInput),
        prefix: sourceResult,
        postfix: prefixToPostfix(normalizedInput),
      };
      break;
    case "postfix":
      results = {
        infix: postfixToInfix(normalizedInput),
        prefix: postfixToPrefix(normalizedInput),
        postfix: sourceResult,
      };
      break;
  }

  const conversionError = Object.values(results).find(
    (result) => result.error
  )?.error;

  return conversionError
    ? { success: false, error: conversionError }
    : { success: true, results };
}
