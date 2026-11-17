// Code Editor tab
// Left: folder tree. Right: editor pane.
// In the Muse space this editor is backed by the space's database:
// files open, edit, save, format, syntax check, add and delete there.
// This React version renders the same layout and the project tree.
const TREE: { name: string; depth: number; folder?: boolean }[] = [
  { name: "MuseSpaceFile", depth: 0, folder: true },
  { name: "ecology-block-diagrams.html", depth: 1 },
  { name: "src", depth: 0, folder: true },
  { name: "App.tsx", depth: 1 },
  { name: "main.tsx", depth: 1 },
  { name: "index.css", depth: 1 },
  { name: "tabs", depth: 1, folder: true },
  { name: "CodeEditor.tsx", depth: 2 },
  { name: "Symbols.tsx", depth: 2 },
  { name: "Components.tsx", depth: 2 },
  { name: "Temperature.tsx", depth: 2 },
  { name: "components", depth: 1, folder: true },
  { name: "Header.tsx", depth: 2 },
  { name: "MarkdownNote.tsx", depth: 2 },
  { name: "MathText.tsx", depth: 2 },
  { name: "SymbolGlyph.tsx", depth: 2 },
  { name: "Oscillator.tsx", depth: 2 },
  { name: "Attenuation.tsx", depth: 2 },
  { name: "Exponential.tsx", depth: 2 },
  { name: "ExponentialTransform.tsx", depth: 2 },
  { name: "Thermostat.tsx", depth: 2 },
  { name: "notes", depth: 1, folder: true },
  { name: "exponential-derivation.md", depth: 2 },
  { name: "thermostat.md", depth: 2 },
  { name: "assets", depth: 1, folder: true },
  { name: "ecology-tree.svg", depth: 2 },
  { name: "data", depth: 1, folder: true },
  { name: "symbols.json", depth: 2 },
  { name: "vite.config.ts", depth: 0 },
  { name: "tsconfig.json", depth: 0 },
  { name: "package.json", depth: 0 },
  { name: "index.html", depth: 0 },
  { name: "README.md", depth: 0 },
];

export function CodeEditor() {
  return (
    <div className="editor-layout">
      <div className="tree">
        {TREE.map((n, i) => (
          <div key={i} className={"node" + (n.folder ? " folder" : "")} style={{ marginLeft: n.depth * 14 }}>
            {n.name}
          </div>
        ))}
      </div>
      <div className="editor-pane">
        <div className="editor-toolbar">
          <button>Format</button>
          <button>Check</button>
          <button>Save</button>
        </div>
        <div className="editor-main">
          <textarea readOnly defaultValue={"// Open a file from the tree.\n// In the Muse space, this editor reads and writes the\n// project's files in the space's database."} />
        </div>
      </div>
    </div>
  );
}
