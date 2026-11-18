import { useState } from "react";
import { Header } from "./components/Header";
import { Symbols } from "./tabs/Symbols";
import { Components } from "./tabs/Components";
import { Temperature } from "./tabs/Temperature";
import "./index.css";

const TABS = ["Symbols", "Components", "Temperature"];

export function App() {
  const [active, setActive] = useState(TABS[0]);
  // Selected component in the Components tab — kept here so it
  // survives switching tabs.
  const [activeComponent, setActiveComponent] = useState("Thermostat");
  return (
    <div>
      <Header />
      <nav className="tabs">{TABS.map((t, i) => <button key={t} className={t === active ? "active" : ""} onClick={() => setActive(t)}>{i + 1}. {t}</button>)}</nav>
      <main className="tab-body">
        {active === "Symbols" && <Symbols />}
        {active === "Components" && <Components active={activeComponent} setActive={setActiveComponent} />}
        {active === "Temperature" && <Temperature />}
      </main>
    </div>
  );
}
