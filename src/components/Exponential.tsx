// Exponential — reusable component
// A quantity Q settles from its starting value A to its target
// value B at a rate set by the constant k, following the general
// solution Q(t) = B + (A - B) * e^(-k t) — the Newton's law of
// cooling form. Sliders set A, B and k; the graph below follows
// the solution live, transient first, then the steady state.
// The derivation of the solution is in the note below the graph.
import { useEffect, useRef, useState } from "react";
import { MarkdownNote } from "./MarkdownNote";
import note from "../notes/exponential-derivation.md?raw";

export function Exponential() {
  const [A, setA] = useState(80);
  const [B, setB] = useState(25);
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
      const lo = Math.min(A, B);
      const hi = Math.max(A, B);
      const span = Math.max(hi - lo, 10);
      const yMin = lo - span * 0.25;
      const yMax = hi + span * 0.25;
      const x = (t: number) => padL + (t / T_MAX) * (W - padL - padR);
      const y = (q: number) =>
        padT + (1 - (q - yMin) / (yMax - yMin)) * (H - padT - padB);
      ctx.clearRect(0, 0, W, H);
      // Axes
      ctx.strokeStyle = "#3a3d42";
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(W - padR, H - padB);
      ctx.stroke();
      // Steady state line at B
      ctx.strokeStyle = "#e8e8e8";
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y(B));
      ctx.lineTo(W - padR, y(B));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#e8e8e8";
      ctx.font = "12px system-ui";
      ctx.fillText("steady state  B = " + B, padL + 6, y(B) - 6);
      ctx.fillText("A = " + A, padL + 6, y(A) + (A > B ? -6 : 14));
      ctx.fillText("t", W - padR - 10, H - 8);
      ctx.fillText("Q", 8, padT + 4);
      // The solution curve, drawn up to the moving time point
      ctx.strokeStyle = "#ff8c3a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const steps = Math.max(2, Math.floor(tNow * 30));
      for (let i = 0; i <= steps; i++) {
        const t = i / 30;
        const q = B + (A - B) * Math.exp(-k * t);
        if (i === 0) ctx.moveTo(x(t), y(q));
        else ctx.lineTo(x(t), y(q));
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      // Moving point on the curve
      const qNow = B + (A - B) * Math.exp(-k * tNow);
      ctx.fillStyle = "#ff8c3a";
      ctx.beginPath();
      ctx.arc(x(tNow), y(qNow), 4, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [A, B, k]);

  return (
    <div>
      <div className="component-controls">
        <label>
          Starting value A: {A}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={A}
            onChange={(e) => setA(Number(e.target.value))}
          />
        </label>
        <label>
          Target value B: {B}
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
