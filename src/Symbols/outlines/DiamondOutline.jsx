// Diamond outline — environmental signal generators.
// Drawn inside a symbol's 64 x 64 SVG.
const INK = "#e8e8e8";

export function DiamondOutline() {
  return <polygon points="32,3 61,32 32,61 3,32" fill="none" stroke={INK} strokeWidth="2" />;
}
