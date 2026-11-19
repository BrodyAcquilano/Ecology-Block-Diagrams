// Square outline — transforms.
// Drawn inside a symbol's 64 x 64 SVG.
const INK = "#e8e8e8";

export function SquareOutline() {
  return <rect x="5" y="5" width="54" height="54" fill="none" stroke={INK} strokeWidth="2" />;
}
