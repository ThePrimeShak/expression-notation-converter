const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0d12]/80 backdrop-blur-xl">
      <div className="container flex max-w-6xl items-center justify-between py-4">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Expression Notation Converter home"
        >
          <span className="from-primary to-accent shadow-primary/20 grid size-10 place-items-center rounded-xl bg-gradient-to-br font-mono text-lg font-black text-white shadow-lg transition-transform group-hover:-rotate-3">
            ƒx
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-tight text-white">
              Expression Notation
            </span>
            <span className="text-muted block text-xs">
              Converter & Visualizer
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-2" aria-label="External links">
          <a
            href="https://github.com/ThePrimeShak/expression-compiler"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-white/8"
            aria-label="View source code on GitHub"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.3-5.28-1.29-5.28-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.94 10.94 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
              />
            </svg>
            <span className="hidden sm:inline">Source</span>
          </a>
          <a
            href="https://www.linkedin.com/in/theprimeshak/"
            target="_blank"
            rel="noreferrer"
            className="from-primary to-accent shadow-primary/15 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-3.5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            aria-label="Visit ThePrimeShak on LinkedIn"
          >
            ThePrimeShak
            <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5.25 4.5a.75.75 0 0 0 0 1.5h7.69L4.72 14.22a.75.75 0 1 0 1.06 1.06L14 7.06v7.69a.75.75 0 0 0 1.5 0V4.5H5.25Z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
