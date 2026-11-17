const Footer = () => {
  return (
    <footer className="mt-6 border-t border-white/8 py-7 text-slate-400">
      <div className="container flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs leading-5">
          Built for Compiler Design Principles · {new Date().getFullYear()}
        </p>
        <p className="text-xs">
          Designed & developed by{" "}
          <a
            href="https://www.linkedin.com/in/theprimeshak/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white transition-colors hover:text-violet-300"
          >
            ThePrimeShak
          </a>
          {" · "}
          <a
            href="https://github.com/ThePrimeShak/expression-compiler"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
          >
            View source
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
