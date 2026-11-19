// Block diagram — reusable component
// A box container for holding a block diagram. Symbols are
// inserted as components (one per symbol, kept in
// src/Symbols) and placed at specific x/y
// positions. Links draw lines between points on the symbols'
// outlines: a point is one of the 4 quadrant points — top,
// right, bottom, left — or any angle in degrees (0 = right,
// positive clockwise), so a line can meet an outline
// anywhere. Label boxes (the LabelBox component) are placed
// by their centre point, with font and colours set per box.
import { SYMBOLS_BY_KIND } from "../../Symbols";
import { LabelBox } from "./LabelBox";

// A node is { id, symbol, x, y, size? }.

// An anchor is a point on a symbol's outline: a quadrant point
// by name ("top", "right", "bottom", "left"), or an angle in
// degrees (0 = right, 90 = bottom, 180 = left, 270 = top).

// A link is { from, to?, toPoint?, fromAnchor?, toAnchor?, via? }.
// to is the node the line runs to — or omit it and give toPoint
// ({ x, y }) instead, for a line that just runs out of the
// diagram (an output: the signal on it is measured at the edge).
// via is a list of { x, y } waypoints the line runs through, in
// order — for lines that have to bend, like a feedback loop.

// A label is a LabelBox's props: { x, y, text?, tex?, fontSize?,
// color?, borderColor?, fill? }.

const DEFAULT_SIZE = 64;

function anchorPoint(node, anchor = "right") {
  const size = node.size ?? DEFAULT_SIZE;
  const r = (size * 29) / 64; // the drawn outline's radius
  const deg =
    anchor === "right"
      ? 0
      : anchor === "bottom"
        ? 90
        : anchor === "left"
          ? 180
          : anchor === "top"
            ? 270
            : anchor;
  const rad = (deg * Math.PI) / 180;
  return { x: node.x + r * Math.cos(rad), y: node.y + r * Math.sin(rad) };
}

export function BlockDiagram({
  width,
  height,
  nodes,
  links,
  labels = [],
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  return (
    <div className="block-diagram" style={{ width, height }}>
      <svg className="diagram-links" width={width} height={height}>
        <defs>
          <marker
            id="diagram-arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L7 3 L0 6 Z" fill="#9a9da3" />
          </marker>
        </defs>
        {links.map((l, i) => {
          const a = byId.get(l.from);
          if (!a) return null;
          const p = anchorPoint(a, l.fromAnchor);
          const b = l.to ? byId.get(l.to) : undefined;
          const q = l.toPoint ?? (b ? anchorPoint(b, l.toAnchor) : null);
          if (!q) return null;
          if (l.via && l.via.length > 0) {
            const pts = [p, ...l.via, q].map((pt) => `${pt.x},${pt.y}`).join(" ");
            return (
              <polyline
                key={i}
                points={pts}
                fill="none"
                stroke="#9a9da3"
                strokeWidth="1.5"
                markerEnd="url(#diagram-arrowhead)"
              />
            );
          }
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="#9a9da3"
              strokeWidth="1.5"
              markerEnd="url(#diagram-arrowhead)"
            />
          );
        })}
      </svg>
      {nodes.map((n) => {
        const Sym = SYMBOLS_BY_KIND[n.symbol];
        if (!Sym) return null;
        return (
          <div key={n.id} className="diagram-node" style={{ left: n.x, top: n.y }}>
            <Sym size={n.size ?? DEFAULT_SIZE} />
          </div>
        );
      })}
      {labels.map((l, i) => (
        <LabelBox key={i} {...l} />
      ))}
    </div>
  );
}
