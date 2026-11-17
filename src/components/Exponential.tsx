// Exponential — reusable component
// A quantity A settles from its starting value B to its target
// value C at a rate set by the constant k, following the general
// solution A(t) = C + (B - C) * e^(-k t) — the Newton's law of
// cooling form. Sliders set B, C and k; the graph below follows
// the solution live, transient first, then the steady state.
// The derivation of the solution is in the note below the graph.
import { useEffect, useRef, useState } from "react";
import { MarkdownNote } from "./MarkdownNote";
import note from "../notes/exponential-derivation.md?raw";

export function Exponential() {
  const [B, setB] = useState(80);
  const [C, setC] = useState(25);
  const [k, setK] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      const lo = Math.min(B, C);
      const hi = Math.max(B, C);
      const span = Math.max(hi - lo, 10);
      const yMin = lo - span * 0.25;
      const yMax = hi + span * 0.25;
      const x = (t: number) => padL + (t / T_MAX) * (W - padL - padR);
      const y = (a: number) =>
        padT + (1 - (a - yMin) / (yMax - yMin)) * (H - padT - padB);
      ctx.clearRect(0, 0, W, H);
      // Axes
      ctx.strokeStyle = "#3a3d42";
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(W - padR, H - padB);
      ctx.stroke();
      // Steady state line at C
      ctx.strokeStyle = "#e8e8e8";
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y(C));
      ctx.lineTo(W - padR, y(C));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#e8e8e8";
      ctx.font = "12px system-ui";
      ctx.fillText("steady state  C = " + C, padL + 6, y(C) - 6);
      ctx.fillText("B = " + B, padL + 6, y(B) + (B > C ? -6 : 14));
      ctx.fillText("t", W - padR - 10, H - 8);
      ctx.fillText("A", 8, padT + 4);
      // The solution curve, drawn up to the moving time point
      ctx.strokeStyle = "#ff8c3a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const steps = Math.max(2, Math.floor(tNow * 30));
      for (let i = 0; i <= steps; i++) {
        const t = i / 30;
        const a = C + (B - C) * Math.exp(-k * t);
        if (i === 0) ctx.moveTo(x(t), y(a));
        else ctx.lineTo(x(t), y(a));
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      // Moving point on the curve
      const aNow = C + (B - C) * Math.exp(-k * tNow);
      ctx.fillStyle = "#ff8c3a";
      ctx.beginPath();
      ctx.arc(x(tNow), y(aNow), 4, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [B, C, k]);

  return (
    <div>
      <div className="component-controls">
        <label>
          Starting value B: {B}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={B}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </label>
        <label>
          Target value C: {C}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={C}
            onChange={(e) => setC(Number(e.target.value))}
          />
        </label>
        <label>
          Decay rate k: {k.toFixed(2)}
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.05}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </label>
      </div>
      <canvas ref={canvasRef} width={560} height={280} className="component-graph" />
      <MarkdownNote source={note} />
    </div>
  );
}
