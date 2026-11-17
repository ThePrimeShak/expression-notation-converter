import { useState } from "react";

import type { StackState } from "@/features/converter/types";

import Collapse from "./Collapse";
import ConversionSteps from "./ConversionSteps";
import StackVisualizer from "./StackVisualizer";

type NotationCardProps = {
  title: string;
  result?: string;
  steps: StackState[];
};

const NotationCard = ({ title, result, steps }: NotationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    steps.length > 0 ? steps.length - 1 : 0
  );

  return (
    <article
      className={isOpen ? "md:col-span-2" : undefined}
      aria-label={`${title} notation card`}
    >
      <Collapse
        title={
          <div className="flex items-center gap-3">
            <span className="border-primary/20 bg-primary/10 text-primary grid size-9 place-items-center rounded-lg border font-mono text-sm font-bold">
              {title.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-muted text-xs">Converted notation</p>
              <h3 className="font-semibold text-white">{title}</h3>
            </div>
          </div>
        }
        result={result}
        open={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      >
        <div className="space-y-4">
          <StackVisualizer states={steps} currentStep={currentStep} />
          <ConversionSteps steps={steps} onSelectStep={setCurrentStep} />
        </div>
      </Collapse>
    </article>
  );
};

export default NotationCard;
