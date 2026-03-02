import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supplierData, supplierAlerts } from "../data/sampleData";
import "../styles/theme.css";

const riskConfig = {
  low:    { cls:"badge-success", color:"var(--success)", bg:"rgba(34,197,94,0.12)"  },
  medium: { cls:"badge-warn",    color:"var(--warn)",    bg:"rgba(249,115,22,0.12)" },
  high:   { cls:"badge-danger",  color:"var(--danger)",  bg:"rgba(239,68,68,0.12)"  },
};

const alertIcon = { high:"🔴", medium:"⚠️", low:"ℹ️" };

function Sparkline({ data, color }) {
  if (!data?.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 30;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`
  ).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreRing({ score, color }) {
  const r = 24, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg viewBox="0 0 60 60" width="60" height="60">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
      <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%" }} />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
        fill={color} fontSize="11" fontWeight="700">{score}</text>
    </svg>
  );
}

export default function SupplierRiskPage() {
  const { addToast } = useOutletContext();
  const [filterRisk, setFilterRisk] = useState("all");
  const [selected,   setSelected]   = useState(null);

  const filtered = filterRisk === "all"
    ? supplierData
    : supplierData.filter(s => s.risk === filterRisk);

  const avgScore = Math.round(
    supplierData.reduce((a, b) => a + b.score, 0) / supplierData.length
  );

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title-lg">Supplier Risk Analysis</h1>
          <p className="page-subtitle">
            {supplierData.length} suppliers · {supplierData.filter(s => s.risk === "high").length} high risk
          </p>
        </div>
        <div className="card-actions">
          <select className="db-select" value={filterRisk} onChange={e => setFilterRisk(e.target.value)}>
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          <button className="btn btn-primary btn-sm"
            onClick={() => addToast("Supplier report exported!", "success")}>
            📥 Export
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="sr-summary page-section">
        {[
          { label:"Avg Risk Score", val:avgScore, color:"var(--accent)"  },
          { label:"Low Risk",       val:supplierData.filter(s=>s.risk==="low").length,    color:"var(--success)" },
          { label:"Medium Risk",    val:supplierData.filter(s=>s.risk==="medium").length, color:"var(--warn)"    },
          { label:"High Risk",      val:supplierData.filter(s=>s.risk==="high").length,   color:"var(--danger)"  },
        ].map(s => (
          <div key={s.label} className="card sr-tile">
            <span className="sr-tile-val" style={{ color:s.color }}>{s.val}</span>
            <span className="sr-tile-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Supplier Cards */}
      <div className="sr-grid page-section">
        {filtered.map((s, i) => {
          const cfg = riskConfig[s.risk];
          return (
            <article key={s.id}
              className={`card sr-card animate-fadeUp ${selected === s.id ? "sr-selected" : ""}`}
              style={{ animationDelay:`${i * 0.07}s`, "--risk-color": cfg.color }}
              onClick={() => setSelected(selected === s.id ? null : s.id)}>

              <div className="sr-card-top">
                <div>
                  <div className="sr-name">{s.name}</div>
                  <div className="sr-cat">{s.category}</div>
                </div>
                <ScoreRing score={s.score} color={cfg.color} />
              </div>

              <div className="sr-risk-badge">
                <span className={`badge ${cfg.cls}`}>
                  {s.risk === "low" ? "✓" : s.risk === "medium" ? "⚠" : "✕"} {s.risk.toUpperCase()} RISK
                </span>
                <Sparkline data={s.trend} color={cfg.color} />
              </div>

              {selected === s.id && (
                <div className="sr-detail animate-fadeUp">
                  <div className="sr-metrics">
                    {[
                      { label:"Delivery",   val:s.delivery   },
                      { label:"Quality",    val:s.quality    },
                      { label:"Compliance", val:s.compliance },
                    ].map(m => (
                      <div key={m.label} className="sr-metric">
                        <div className="sr-metric-head">
                          <span>{m.label}</span>
                          <span style={{ color: m.val >= 80 ? "var(--success)" : m.val >= 60 ? "var(--warn)" : "var(--danger)" }}>
                            {m.val}%
                          </span>
                        </div>
                        <div className="sr-metric-bar">
                          <div className="sr-metric-fill" style={{
                            width:`${m.val}%`,
                            background: m.val >= 80 ? "var(--success)" : m.val >= 60 ? "var(--warn)" : "var(--danger)"
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-ghost btn-sm"
                    onClick={e => { e.stopPropagation(); addToast(`Alert sent for ${s.name}`, "info"); }}>
                    🔔 Send Alert
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="card page-section" style={{ padding:"1.2rem" }}>
        <div className="card-title">🚨 Active Risk Alerts</div>
        <div className="sr-alerts">
          {supplierAlerts.map((a, i) => (
            <div key={a.id}
              className={`sr-alert-item animate-fadeUp sr-alert-${a.severity}`}
              style={{ animationDelay:`${i * 0.06}s` }}>
              <span className="sr-alert-ico">{alertIcon[a.severity]}</span>
              <div className="sr-alert-body">
                <div className="sr-alert-supplier">{a.supplier}</div>
                <div className="sr-alert-msg">{a.msg}</div>
              </div>
              <span className={`badge badge-${a.severity === "high" ? "danger" : a.severity === "medium" ? "warn" : "info"}`}>
                {a.severity}
              </span>
              <button className="btn btn-outline btn-sm"
                onClick={() => addToast(`Alert acknowledged: ${a.supplier}`, "success")}>
                Ack
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}