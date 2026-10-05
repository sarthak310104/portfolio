"use client";

import { useEffect, useMemo, useState } from "react";

// A tiny in-browser re-enactment of Ghost Protocol's core loop: a service
// graph with learned per-edge baselines; inject latency on one edge and watch
// the z-score cross threshold and an incident open. No backend involved.

type Node = { id: string; x: number; y: number; hub?: boolean };
const NODES: Node[] = [
  { id: "gateway", x: 60, y: 120 },
  { id: "checkout", x: 190, y: 60, hub: true },
  { id: "auth", x: 190, y: 185 },
  { id: "payments", x: 330, y: 40 },
  { id: "inventory", x: 330, y: 130 },
  { id: "ledger", x: 455, y: 85 },
  { id: "notify", x: 455, y: 195 },
];
const EDGES: [string, string, number][] = [
  ["gateway", "checkout", 42],
  ["gateway", "auth", 18],
  ["checkout", "payments", 120],
  ["checkout", "inventory", 35],
  ["auth", "inventory", 22],
  ["payments", "ledger", 64],
  ["inventory", "notify", 15],
];
const TARGET = "payments->ledger";

export default function GhostGraphDemo() {
  const [injected, setInjected] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(id);
  }, []);

  const byId = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), []);

  // deterministic-ish jitter so numbers move but stay near baseline
  const jitter = (seed: number) => Math.sin(seed * 12.9898 + tick * 0.7) * 0.5 + 0.5;
  const baseline = 64;
  const sd = 6;
  const observed = injected ? Math.round(baseline * 3.1 + jitter(3) * 12) : Math.round(baseline + (jitter(3) - 0.5) * 10);
  const z = (observed - baseline) / sd;
  const incident = z > 3;

  return (
    <div className="ghost-demo">
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 14px" }}>
        a miniature of the anomaly loop running in your browser: each edge has a learned
        p95 baseline. inject latency into one dependency and watch it get flagged.
      </p>
      <div className="ghost-demo-canvas">
        <svg viewBox="0 0 520 240" role="img" aria-label="service graph with one anomalous edge">
          <defs>
            <filter id="gglow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {EDGES.map(([a, b, ms]) => {
            const key = `${a}->${b}`;
            const hot = injected && key === TARGET;
            const A = byId[a];
            const B = byId[b];
            const d = `M${A.x},${A.y} L${B.x},${B.y}`;
            const dur = hot ? 3.2 : Math.max(0.9, ms / 45);
            return (
              <g key={key}>
                <path d={d} className={`gg-edge${hot ? " hot" : ""}`} />
                <circle r={hot ? 3.5 : 2.5} className={`gg-packet${hot ? " hot" : ""}`}>
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            );
          })}
          {NODES.map((n) => {
            const hot = injected && (n.id === "payments" || n.id === "ledger");
            return (
              <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                <circle
                  r={n.hub ? 13 : 9}
                  className={`gg-node${hot ? " hot" : ""}${n.hub ? " hub" : ""}`}
                  filter="url(#gglow)"
                />
                <text y={n.hub ? 28 : 24} textAnchor="middle" className="gg-label">
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="ghost-demo-row mono">
        <button type="button" className={`btn ${injected ? "btn-danger" : "btn-ghost"}`} onClick={() => setInjected((v) => !v)}>
          {injected ? "rollback fix" : "inject latency: payments → ledger"}
        </button>
        <div className={`gg-readout${incident ? " alert" : ""}`}>
          <span>p95 {observed}ms</span>
          <span>baseline {baseline}ms</span>
          <span>z {z.toFixed(1)}</span>
          <b>{incident ? "INCIDENT OPEN" : "NOMINAL"}</b>
        </div>
      </div>
    </div>
  );
}