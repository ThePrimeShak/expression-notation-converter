import type { ReactNode } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { DownArrow, UpArrow } from "@/components/icons/ArrowsIcon";
type CollapseProps = {
  title: ReactNode;
  open?: boolean;
  onToggle?: () => void;
  children: ReactNode;
  result?: string;
};

const ANIMATION_DURATION = 0.2;

const Collapse = ({
  title,
  open = false,
  onToggle,
  children,
  result,
}: CollapseProps) => {
  const buttonLabel = open ? "Collapse" : "Expand";

  return (
    <div
      className={`surface overflow-hidden transition-colors ${open ? "border-primary/30" : "hover:border-white/15"}`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-5 pt-5 text-left">
        {title}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={`${buttonLabel} conversion details`}
        >
          {buttonLabel}
          {buttonLabel === "Collapse" ? <UpArrow /> : <DownArrow />}
        </button>
      </div>
      <span className="block overflow-x-auto px-5 pt-4 pb-5 font-mono text-base font-medium text-white sm:text-lg">
        {result}
      </span>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className="border-t border-white/8 px-5 pt-5 pb-5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapse;
