import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ExpressionConverter } from "@/features/converter/components/ExpressionConverter";

const App = () => {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_15%_10%,rgba(124,92,255,0.16),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(56,189,248,0.12),transparent_28%)]" />
      <Header />
      <main>
        <ExpressionConverter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
