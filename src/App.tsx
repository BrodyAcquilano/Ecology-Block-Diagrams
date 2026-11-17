import { useState } from "react";
import { CodeEditor } from "./tabs/CodeEditor";
import { Symbols } from "./tabs/Symbols";
import { Components } from "./tabs/Components";
import { Temperature } from "./tabs/Temperature";

const ALL_TABS = ["Code Editor", "Symbols", "Components", "Temperature"] as const;

export function App() {
  const tabs = __SHOW_CODE_EDITOR__ ? [...ALL_TABS] : ALL_TABS.slice(1);
  const [active, setActive] = useState(tabs[0]);
  return (
    <div>
      <nav>{tabs.map((t) => <button key={t} onClick={() => setActive(t)}>{t}</button>)}</nav>
      {active === "Code Editor" && <CodeEditor />}
      {active === "Symbols" && <Symbols />}
      {active === "Components" && <Components />}
      {active === "Temperature" && <Temperature />}
    </div>
  );
}
