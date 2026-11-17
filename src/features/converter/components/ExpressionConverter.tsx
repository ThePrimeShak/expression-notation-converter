import { useState, type FormEvent } from "react";

import {
  convertExpression,
  createEmptyResults,
} from "@/features/converter/lib/convert-expression";
import type { Notation } from "@/features/converter/types";

import NotationCard from "./NotationCard";

const EXAMPLES: Record<Notation, string> = {
  infix: "(a + b) * c",
  postfix: "a b + c *",
  prefix: "* + a b c",
};

const NOTATION_COPY: Record<Notation, string> = {
  infix: "Operators sit between operands",
  postfix: "Operators follow their operands",
  prefix: "Operators come before operands",
};
const NOTATIONS: readonly Notation[] = ["infix", "prefix", "postfix"];

export const ExpressionConverter = () => {
  const [notationType, setNotationType] = useState<Notation>("infix");
  const [input, setInput] = useState(EXAMPLES.infix);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState(createEmptyResults);
  const showContent = Object.values(results).some(
    (conversion) => conversion.result !== undefined
  );
  const { infix, postfix, prefix } = results;

  const resetResults = () => {
    setError(null);
    setResults(createEmptyResults());
  };

  const handleConvert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const outcome = convertExpression(input, notationType);
    if (!outcome.success) {
      setResults(createEmptyResults());
      setError(outcome.error);
      return;
    }

    setError(null);
    setResults(outcome.results);
  };

  return (
    <section id="top" className="container max-w-6xl py-14 sm:py-20">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <div className="border-primary/20 bg-primary/8 text-primary mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase">
          <span className="bg-primary size-1.5 rounded-full shadow-[0_0_12px_currentColor]" />
          Compiler Design Tool
        </div>
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-balance text-white sm:text-5xl lg:text-6xl">
          Convert expressions.
          <span className="from-primary to-accent block bg-gradient-to-r bg-clip-text text-transparent">
            See the logic unfold.
          </span>
        </h1>
        <p className="text-muted mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base">
          Translate between infix, prefix, and postfix notation, then explore
          every stack operation behind the conversion.
        </p>
      </div>

      <div className="surface mx-auto max-w-4xl p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-1">
          <label
            htmlFor="expression"
            className="text-sm font-semibold text-white"
          >
            Enter your expression
          </label>
          <p className="text-muted text-xs">{NOTATION_COPY[notationType]}</p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-black/20 p-1.5">
          {NOTATIONS.map((notation) => (
            <button
              key={notation}
              type="button"
              onClick={() => {
                setNotationType(notation);
                resetResults();
                setInput(EXAMPLES[notation]);
              }}
              className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition-all ${
                notationType === notation
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              aria-pressed={notationType === notation}
            >
              {notation}
            </button>
          ))}
        </div>

        <form aria-label="Expression input" onSubmit={handleConvert}>
          <div
            className={`focus-within:border-primary/60 focus-within:ring-primary/10 flex flex-col gap-3 rounded-2xl border bg-[#0d1017] p-2.5 transition-all focus-within:ring-4 sm:flex-row ${
              error ? "border-red-400/60" : "border-white/10"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
              <span
                className="text-primary font-mono text-lg"
                aria-hidden="true"
              >
                {notationType === "infix"
                  ? "()"
                  : notationType === "prefix"
                    ? "◀"
                    : "▶"}
              </span>
              <input
                id="expression"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(null);
                }}
                className="min-w-0 flex-1 bg-transparent py-2 font-mono text-base text-white outline-none placeholder:text-slate-600 sm:text-lg"
                placeholder={`Try ${EXAMPLES[notationType]}`}
                aria-describedby={error ? "expression-error" : undefined}
                aria-invalid={Boolean(error)}
                name="notation"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              className="from-primary to-accent shadow-primary/20 cursor-pointer rounded-xl bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
            >
              Convert expression
            </button>
          </div>
          <div className="mt-3 min-h-5">
            {error ? (
              <p
                id="expression-error"
                className="flex items-center gap-2 text-sm text-red-300"
                role="alert"
              >
                <span aria-hidden="true">●</span> {error}
              </p>
            ) : (
              <p className="text-muted text-xs">
                Supports variables, numbers, parentheses, and + - * / ^
                operators.
              </p>
            )}
          </div>
        </form>
      </div>

      {showContent && (
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                Conversion complete
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Your results
              </h2>
            </div>
            <span className="text-muted rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs">
              Click a card to explore
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {notationType !== "infix" && (
              <NotationCard
                key={`infix-${infix.result}`}
                title="Infix"
                result={infix.result}
                steps={infix.steps}
              />
            )}

            {notationType !== "prefix" && (
              <NotationCard
                key={`prefix-${prefix.result}`}
                title="Prefix"
                result={prefix.result}
                steps={prefix.steps}
              />
            )}

            {notationType !== "postfix" && (
              <NotationCard
                key={`postfix-${postfix.result}`}
                title="Postfix"
                result={postfix.result}
                steps={postfix.steps}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
