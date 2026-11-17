// Block diagram — reusable component
// A box container for holding a block diagram. Symbols are
// inserted as components (one per symbol, kept in
// src/assets/symbols.tsx) and placed at specific x/y
// positions. Links draw lines between points on the symbols'
// outlines: a point is one of the 4 quadrant points — top,
// right, bottom, left — or any angle in degrees (0 = right,
// positive clockwise), so a line can meet an outline
// anywhere. Label boxes (the LabelBox component) are placed
// by their centre point, with font and colours set per box.
import { SYMBOL_COMPONENTS } from "../assets/symbols";
import { LabelBox, type LabelBoxSpec } from "./LabelBox";

export interface DiagramNode {
  id: string;
  symbol: string;
  x: number;
  y: number;
  size?: number;
}

// A point on a symbol's outline: a quadrant point by name,
// or an angle in degrees (0 = right, 90 = bottom,
// 180 = left, 270 = top).
export type Anchor = "top" | "right" | "bottom" | "left" | number;

export interface DiagramLink {
  from: string;
  to: string;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
}

export type DiagramLabel = LabelBoxSpec;

const DEFAULT_SIZE = 64;

function anchorPoint(node: DiagramNode, anchor: Anchor = "right") {
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
}: {
  width: number;
  height: number;
  nodes: DiagramNode[];
  links: DiagramLink[];
  labels?: DiagramLabel[];
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
          const b = byId.get(l.to);
          if (!a || !b) return null;
          const p = anchorPoint(a, l.fromAnchor);
          const q = anchorPoint(b, l.toAnchor);
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
        const Sym = SYMBOL_COMPONENTS[n.symbol];
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
