import "../styles/theme.css";

export default function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="bc-wrap">
      <div className="bc-bars">
        {data.map((d, i) => (
          <div key={i} className="bc-col">
            <div className="bc-bar-wrap">
              <div
                className="bc-bar"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  background: d.color,
                  boxShadow: `0 0 12px ${d.color}55`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span className="bc-val">{d.value}%</span>
              </div>
            </div>
            <span className="bc-label">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}