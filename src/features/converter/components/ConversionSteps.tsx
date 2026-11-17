import type { StackState } from "@/features/converter/types";

type ConversionStepsProps = {
  steps: StackState[];
  onSelectStep?: (stepIndex: number) => void;
};

const ConversionSteps = ({ steps, onSelectStep }: ConversionStepsProps) => {
  const hasSteps = steps.length > 0;

  return (
    <section className="mt-5" aria-label="Conversion steps">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">Conversion steps</h4>
        <span className="text-muted text-xs">Select a step to inspect it</span>
      </div>
      <div className="max-h-52 space-y-2 overflow-auto pr-1">
        {hasSteps ? (
          steps.map((step) => (
            <button
              key={step.stepIndex}
              type="button"
              onClick={() => onSelectStep?.(step.stepIndex)}
              className="group hover:border-primary/30 hover:bg-primary/5 flex w-full cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-3 text-left transition-colors"
            >
              <span className="group-hover:bg-primary grid size-6 shrink-0 place-items-center rounded-md bg-white/10 text-[11px] font-semibold text-slate-300 transition-colors group-hover:text-white">
                {step.stepIndex + 1}
              </span>
              <span className="pt-0.5 text-sm leading-5 text-slate-300">
                {step.action}
              </span>
            </button>
          ))
        ) : (
          <p className="py-4 text-center text-gray-400">No steps to display</p>
        )}
      </div>
    </section>
  );
};

export default ConversionSteps;
