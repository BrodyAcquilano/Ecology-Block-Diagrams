// Header — title on the left, Ecology Lab tree symbol on the right.
import treeUrl from "../../assets/ecology-tree.svg";

export function Header() {
  return (
    <header className="app-header">
      <div className="app-title">Ecology Block Diagrams</div>
      <img className="app-logo" src={treeUrl} alt="Ecology Lab tree symbol" />
    </header>
  );
}
