// Thermostat — reusable component
// The thermostat: it generates a control signal — the set
// temperature T_s, held constant. Its symbol carries a gear
// around the outside so control components can be told apart
// at a glance. One slider slides the constant line up and
// down; the graph is a straight line at T_s.
// The short note is below the graph.
import { useEffect, useRef, useState } from "react";
import { MarkdownNote } from "./MarkdownNote";
import { SymbolGlyph } from "./SymbolGlyph";
import { MathText } from "./MathText";
import note from "../notes/thermostat.md?raw";

export function Thermostat() {
  const [Ts, setTs] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fixed 0-100 scale with the same padding as the other graphs.
  const yMin = -25;
  const yMax = 125;
  const yPx = (a: number) => 14 + (1 - (a - yMin) / (yMax - yMin)) * (280 - 14 - 28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const padL = 44;
    const padR = 12;
    const padT = 14;
    const padB = 28;
    const y = (a: number) =>
      padT + (1 - (a - yMin) / (yMax - yMin)) * (H - padT - padB);
    ctx.clearRect(0, 0, W, H);
    // Axes (labels are LaTeX overlays, not canvas text)
    ctx.strokeStyle = "#3a3d42";
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, H - padB);
    ctx.lineTo(W - padR, H - padB);
    ctx.stroke();
    // The constant line at T_s
    ctx.strokeStyle = "#e5484d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL, y(Ts));
    ctx.lineTo(W - padR, y(Ts));
    ctx.stroke();
    ctx.lineWidth = 1;
  }, [Ts, yMin, yMax]);

  return (
    <div>
      <div className="component-header">
        <SymbolGlyph kind="thermostat" size={56} />
        <h2 className="component-title">Thermostat</h2>
      </div>
      <p className="component-intro">
        The thermostat generates a control signal: the set temperature{" "}
        <MathText tex="T_s" />, held constant. It is the value the heat
        source's temperature settles to — turn the dial and the line moves;
        between turns it does not change. Function type: constant.
      </p>
      <div className="component-controls">
        <label>
          <span>
            Set temperature <MathText tex="T_s" />: {Ts}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Ts}
            onChange={(e) => setTs(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="component-graph-wrap">
        <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
        <span className="graph-label" style={{ left: 50, top: yPx(Ts) - 22 }}>
          <MathText tex={`T_s = ${Ts}`} />
        </span>
        <span className="graph-label" style={{ left: 8, top: 8 }}>
          <MathText tex="T" />
        </span>
        <span className="graph-label" style={{ right: 14, bottom: 4 }}>
          <MathText tex="t" />
        </span>
      </div>
      <MarkdownNote source={note} />
    </div>
  );
}
