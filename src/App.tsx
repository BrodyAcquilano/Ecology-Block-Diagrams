import { useState } from "react";
import { Header } from "./components/Header";
import { CodeEditor } from "./tabs/CodeEditor";
import { Symbols } from "./tabs/Symbols";
import { Components } from "./tabs/Components";
import { Temperature } from "./tabs/Temperature";
import "./index.css";

const ALL_TABS = ["Code Editor", "Symbols", "Components", "Temperature"] as const;

export function App() {
  const tabs = __SHOW_CODE_EDITOR__ ? [...ALL_TABS] : ALL_TABS.slice(1);
  const [active, setActive] = useState(tabs[0]);
  return (
    <div>
      <Header />
      <nav className="tabs">{tabs.map((t) => <button key={t} className={t === active ? "active" : ""} onClick={() => setActive(t)}>{t}</button>)}</nav>
      <main className="tab-body">
        {active === "Code Editor" && <CodeEditor />}
        {active === "Symbols" && <Symbols />}
        {active === "Components" && <Components />}
        {active === "Temperature" && <Temperature />}
      </main>
    </div>
  );
}
