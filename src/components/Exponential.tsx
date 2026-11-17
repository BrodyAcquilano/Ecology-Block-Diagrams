// Heat Signal — reusable component
// (file: Exponential.tsx)
// A temperature T settling from its previous value T_o to the
// set value T_s, following Newton's law of cooling:
// T(t) = T_s + (T_o - T_s) * e^(-k t). The rate constant k is
// Boltzmann's constant — a fixed constant of the model, so it
// has no slider. Sliders set T_o and T_s; the graph follows the
// solution live, transient first, then steady state.
// Variable labels are set in LaTeX (MathText) — before the
// graph and on the graph itself, as overlays on the canvas.
// The derivation of the solution is in the note below the graph.
import { useEffect, useRef, useState } from "react";
import { MarkdownNote } from "./MarkdownNote";
import { SymbolGlyph } from "./SymbolGlyph";
import { MathText } from "./MathText";
import note from "../notes/exponential-derivation.md?raw";

// Boltzmann's constant — the model's fixed rate constant.
// In the graph's normalised time units it sets the settling rate.
const K = 0.7;

export function HeatSignal() {
  const [To, setTo] = useState(80);
  const [Ts, setTs] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The graph's vertical scale, shared by the canvas drawing and
  // the LaTeX labels overlaid on it.
  const lo = Math.min(To, Ts);
  const hi = Math.max(To, Ts);
  const span = Math.max(hi - lo, 10);
  const yMin = lo - span * 0.25;
  const yMax = hi + span * 0.25;
  const yPx = (a: number) => 14 + (1 - (a - yMin) / (yMax - yMin)) * (280 - 14 - 28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const T_MAX = 10;
    const start = performance.now();
    const draw = (now: number) => {
      const elapsed = ((now - start) / 1000) % (T_MAX + 1.5);
      const tNow = Math.min(elapsed, T_MAX);
      const W = canvas.width;
      const H = canvas.height;
      const padL = 44;
      const padR = 12;
      const padT = 14;
      const padB = 28;
      const x = (t: number) => padL + (t / T_MAX) * (W - padL - padR);
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
      // Steady state line at T_s
      ctx.strokeStyle = "#e8e8e8";
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y(Ts));
      ctx.lineTo(W - padR, y(Ts));
      ctx.stroke();
      ctx.setLineDash([]);
      // The solution curve, drawn up to the moving time point
      ctx.strokeStyle = "#e5484d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const steps = Math.max(2, Math.floor(tNow * 30));
      for (let i = 0; i <= steps; i++) {
        const t = i / 30;
        const a = Ts + (To - Ts) * Math.exp(-K * t);
        if (i === 0) ctx.moveTo(x(t), y(a));
        else ctx.lineTo(x(t), y(a));
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      // Moving point on the curve
      const aNow = Ts + (To - Ts) * Math.exp(-K * tNow);
      ctx.fillStyle = "#e5484d";
      ctx.beginPath();
      ctx.arc(x(tNow), y(aNow), 4, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [To, Ts, yMin, yMax]);

  return (
    <div>
      <div className="component-header">
        <SymbolGlyph kind="heat" size={56} />
        <h2 className="component-title">Heat Signal</h2>
      </div>
      <p className="component-intro">
        A temperature settling: <MathText tex="T" /> starts at its previous
        value <MathText tex="T_o" /> and closes on the set temperature{" "}
        <MathText tex="T_s" /> at a rate proportional to the gap that
        remains — Newton's law of cooling. The differential equation is
        first-order linear; its solution is exponential.
      </p>
      <div className="component-controls">
        <label>
          <span>
            Previous temperature <MathText tex="T_o" />: {To}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={To}
            onChange={(e) => setTo(Number(e.target.value))}
          />
        </label>
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
        <p className="empty-note">
          Rate constant <MathText tex="k" />: Boltzmann's constant — fixed, no slider.
        </p>
      </div>
      <div className="component-graph-wrap">
        <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
        <span className="graph-label" style={{ left: 50, top: yPx(Ts) - 22 }}>
          steady state <MathText tex={`T_s = ${Ts}`} />
        </span>
        <span
          className="graph-label"
          style={{ left: 50, top: To > Ts ? yPx(To) - 22 : yPx(To) + 6 }}
        >
          <MathText tex={`T_o = ${To}`} />
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
