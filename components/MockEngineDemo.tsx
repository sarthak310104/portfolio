"use client";

import { useMemo, useState } from "react";

const ENVS = ["dev", "staging", "prod"];
const TIERS = ["free", "pro"];

function matchResponse(env: string, tier: string) {
  if (env === "prod" && tier === "pro") {
    return { status: 200, body: { plan: "pro", rateLimit: 10000, features: ["priority-support", "sso", "audit-log"] } };
  }
  if (env === "prod" && tier === "free") {
    return { status: 200, body: { plan: "free", rateLimit: 100, features: ["basic-support"] } };
  }
  if (env === "staging") {
    return { status: 200, body: { plan: tier, rateLimit: 500, features: ["staging-flagged"], warning: "staging data — resets nightly" } };
  }
  return { status: 200, body: { plan: tier, rateLimit: 1000, features: ["all-flags-on"], note: "dev environment — no rate limiting enforced" } };
}

export default function MockEngineDemo() {
  const [env, setEnv] = useState("prod");
  const [tier, setTier] = useState("free");
  const response = useMemo(() => matchResponse(env, tier), [env, tier]);

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 16px" }}>
        this recreates MockEngine&apos;s rule-matching in the browser — pick a request
        shape and watch it route to a different mock response, no backend involved.
      </p>
      <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
        <label className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>
          ?env=
          <select
            value={env}
            onChange={(e) => setEnv(e.target.value)}
            style={{
              marginLeft: 6,
              background: "var(--bg-raised-2)",
              color: "var(--amber)",
              border: "1px solid var(--border-strong)",
              borderRadius: 4,
              padding: "4px 8px",
              fontFamily: "var(--mono)",
              fontSize: 12,
            }}
          >
            {ENVS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>
          x-user-tier:
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            style={{
              marginLeft: 6,
              background: "var(--bg-raised-2)",
              color: "var(--violet)",
              border: "1px solid var(--border-strong)",
              borderRadius: 4,
              padding: "4px 8px",
              fontFamily: "var(--mono)",
              fontSize: 12,
            }}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="mono"
        style={{
          background: "#050505",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: 16,
          fontSize: 12.5,
        }}
      >
        <div style={{ color: "var(--live)", marginBottom: 8 }}>
          GET /api/plan {`{env: "${env}", x-user-tier: "${tier}"}`} → {response.status}
        </div>
        <pre style={{ margin: 0, color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(response.body, null, 2)}
        </pre>
      </div>
    </div>
  );
}