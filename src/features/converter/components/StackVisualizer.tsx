import { motion, AnimatePresence } from "framer-motion";

import type { StackState } from "@/features/converter/types";

type StackVisualizerProps = {
  states: StackState[];
  currentStep?: number;
};

const EMPTY_STATE: StackState = {
  snapshot: [],
  action: "No steps available",
  stepIndex: 0,
};

const ANIMATION_DURATION = 0.16;

const StackVisualizer = ({
  states,
  currentStep = states.length - 1,
}: StackVisualizerProps) => {
  const getCurrentState = (): StackState => {
    if (states.length === 0) return EMPTY_STATE;
    return states[currentStep] ?? states[states.length - 1];
  };

  const currentState = getCurrentState();
  const hasStates = states.length > 0;

  const hasOperatorStack = currentState.operatorStack !== undefined;

  return (
    <section className="w-full" aria-label="Stack Visualizer">
      <div className="mb-4 flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-white">Stack visualizer</h4>
        <span className="text-muted text-xs leading-5">
          Step {currentState.stepIndex + 1} of {states.length || 1} —{" "}
          {currentState.action}
        </span>
      </div>

      <div
        className={`grid gap-3 ${hasOperatorStack ? "sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.25fr]" : "sm:grid-cols-2"}`}
      >
        {/* Output Stack */}
        <div className="rounded-xl border border-white/8 bg-black/20 p-3">
          <span className="text-muted mb-3 block text-xs font-medium">
            {hasOperatorStack ? "Output Stack" : "Stack"}
          </span>
          <div className="flex min-h-28 flex-col-reverse gap-2">
            <AnimatePresence>
              {currentState.snapshot.map((item, index) => (
                <motion.div
                  key={`output-${item}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: ANIMATION_DURATION }}
                  className="border-primary/20 bg-primary/10 rounded-lg border p-2 text-center font-mono text-sm font-medium text-white"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Operator Stack - only shown for infix conversions */}
        {hasOperatorStack && (
          <div className="rounded-xl border border-white/8 bg-black/20 p-3">
            <span className="text-muted mb-3 block text-xs font-medium">
              Operator Stack
            </span>
            <div className="flex min-h-28 flex-col-reverse gap-2">
              <AnimatePresence>
                {currentState.operatorStack!.map((item, index) => (
                  <motion.div
                    key={`operator-${item}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: ANIMATION_DURATION }}
                    className="border-accent/20 bg-accent/10 rounded-lg border p-2 text-center font-mono text-sm font-medium text-white"
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Stack Progression */}
        <div
          className="max-h-64 min-h-28 overflow-auto rounded-xl border border-white/8 bg-black/20 p-3"
          aria-label="Stack Progression"
        >
          <span className="text-muted mb-3 block text-xs font-medium">
            Progression
          </span>
          <div className="flex flex-col gap-1">
            {hasStates ? (
              states.map((state) => (
                <div
                  key={state.stepIndex}
                  className={`rounded-lg border p-2 transition-colors ${
                    state.stepIndex === currentState.stepIndex
                      ? "border-primary/30 bg-primary/10"
                      : "border-white/5 bg-white/3"
                  }`}
                >
                  <span className="text-primary mb-1 block text-xs font-medium">
                    Step #{state.stepIndex + 1}
                  </span>
                  <div className="space-y-1 font-mono text-xs text-slate-300">
                    {state.snapshot.length > 0 ? (
                      <div>
                        <span className="text-muted">Output: </span>[
                        {state.snapshot.join(", ")}]
                      </div>
                    ) : (
                      <div className="flex flex-col items-start">
                        <span>Output:</span>
                        <span className="text-gray-400 italic">empty</span>
                      </div>
                    )}
                    {state.operatorStack !== undefined && (
                      <>
                        {state.operatorStack.length > 0 ? (
                          <div>
                            <span className="text-muted">Operators: </span>[
                            {state.operatorStack.join(", ")}]
                          </div>
                        ) : (
                          <div className="flex flex-col items-start">
                            <span>Operators:</span>
                            <span className="text-gray-400 italic">empty</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-gray-400">No steps to show</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackVisualizer;
