import "../styles/theme.css";

const W = 700, H = 180, PAD = 10;
const MAX = 20000;
const toY = v => H - (v / MAX) * H + PAD;

const pts = (data, key, step) =>
  data.map((d, i) => d[key] != null ? `${i * step},${toY(d[key])}` : null)
      .filter(Boolean).join(" ");

const areaPath = (data, key, step) => {
  const valid = data
    .map((d, i) => d[key] != null ? { x: i * step, y: toY(d[key]) } : null)
    .filter(Boolean);
  if (!valid.length) return "";
  const line = valid.map(p => `${p.x},${p.y}`).join(" ");
  return `${valid[0].x},${H + PAD} ${line} ${valid[valid.length - 1].x},${H + PAD}`;
};

export default function LineChart({ data }) {
  if (!data || !data.length) return <div className="chart-empty">No data</div>;
  const step = W / (data.length - 1);
  const yLabels = [20000, 15000, 10000, 5000, 0];

  return (
    <div className="lc-wrap">
      <div className="lc-y-axis">
        {yLabels.map(v => <span key={v}>{v >= 1000 ? `${v / 1000}k` : v}</span>)}
      </div>

      <div className="lc-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H + 2 * PAD}`} preserveAspectRatio="none" width="100%" height="100%">
          <defs>
            <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yLabels.map(v => (
            <line key={v} x1="0" y1={toY(v)} x2={W} y2={toY(v)}
              stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
          ))}

          <polygon points={areaPath(data, "forecast", step)} fill="url(#gradForecast)" />
          <polygon points={areaPath(data, "actual",   step)} fill="url(#gradActual)"   />
          <polyline points={pts(data, "forecast", step)} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="8 4" />
          <polyline points={pts(data, "actual",   step)} fill="none" stroke="#8b5cf6" strokeWidth="2.5" />

          {data.map((d, i) => d.actual != null && (
            <circle key={`a${i}`} cx={i * step} cy={toY(d.actual)} r="5"
              fill="#8b5cf6" stroke="#0a0714" strokeWidth="2" />
          ))}
          {data.map((d, i) => d.forecast != null && (
            <circle key={`f${i}`} cx={i * step} cy={toY(d.forecast)} r="4"
              fill="#22c55e" stroke="#0a0714" strokeWidth="2" />
          ))}
        </svg>
      </div>

      <div className="lc-x-axis">
        {data.map((d, i) => <span key={i}>{d.month}</span>)}
      </div>

      <div className="lc-legend">
        <span><i className="leg-dot" style={{ background: "#8b5cf6" }}></i>Actual Sales</span>
        <span><i className="leg-dot" style={{ background: "#22c55e" }}></i>Forecasted Demand</span>
        <span><i className="leg-area"></i>Prediction Range</span>
      </div>
    </div>
  );
}