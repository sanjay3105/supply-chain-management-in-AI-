import "../styles/theme.css";

export default function KPICard({ icon, label, value, delta, up, delay = 0 }) {
  const deltaColor = up === true ? "delta-up" : up === false ? "delta-down" : "delta-neutral";

  return (
    <article
      className="kpi-card card animate-fadeUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="kpi-top">
        <span className="kpi-ico">{icon}</span>
        <span className="kpi-lbl">{label}</span>
      </div>
      <div className="kpi-val">{value}</div>
      {delta && (
        <div className={`kpi-delta ${deltaColor}`}>
          {up === true ? "▲" : up === false ? "▼" : ""} {delta}
        </div>
      )}
      <div className="kpi-glow"></div>
    </article>
  );
}