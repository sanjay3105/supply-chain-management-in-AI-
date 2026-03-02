import "../styles/theme.css";

export function SkeletonCard() {
  return (
    <div className="sk-card card">
      <div className="sk-line sk-short skeleton"></div>
      <div className="sk-line sk-long skeleton"></div>
      <div className="sk-line sk-medium skeleton"></div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="sk-table">
      <div className="sk-table-header skeleton"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="sk-table-row skeleton"
          style={{ animationDelay: `${i * 0.08}s` }}></div>
      ))}
    </div>
  );
}