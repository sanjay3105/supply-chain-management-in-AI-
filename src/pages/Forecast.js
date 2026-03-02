import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LineChart from "../components/LineChart";
import { SkeletonCard } from "../components/SkeletonLoader";
import { forecastData } from "../data/sampleData";
import "../styles/theme.css";

const avgAccuracy = forecastData.filter(d => d.accuracy)
  .reduce((a, b) => a + b.accuracy, 0) / forecastData.filter(d => d.accuracy).length;

export default function ForecastPage() {
  const { addToast } = useOutletContext();
  const [loading, setLoading]     = useState(true);
  const [dateRange, setDateRange] = useState("6m");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    const csv = [
      "Month,Actual,Predicted,Accuracy",
      ...forecastData.map(d =>
        `${d.month},${d.actual ?? ""},${d.predicted},${d.accuracy ?? "Pending"}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "forecast_data.csv"; a.click();
    URL.revokeObjectURL(url);
    addToast("Forecast data downloaded as CSV", "success");
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title-lg">Demand Forecast</h1>
          <p className="page-subtitle">AI-powered prediction using LSTM &amp; ARIMA models</p>
        </div>
        <div className="card-actions">
          <select className="db-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option value="3m">Next 3 Months</option>
            <option value="6m">Next 6 Months</option>
            <option value="12m">Next 12 Months</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={handleDownload}>
            📥 Download CSV
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="kpi-grid page-section">
        {loading ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />) : (
          <>
            <div className="card fc-stat-card">
              <div className="kpi-top"><span className="kpi-ico">🎯</span><span className="kpi-lbl">Average Forecast Accuracy</span></div>
              <div className="fc-accuracy">
                <span className="fc-acc-val">{avgAccuracy.toFixed(1)}%</span>
                <div className="acc-bar"><div className="acc-fill" style={{ width:`${avgAccuracy}%` }}></div></div>
              </div>
            </div>
            <div className="card fc-stat-card">
              <div className="kpi-top"><span className="kpi-ico">📅</span><span className="kpi-lbl">Months Forecasted Ahead</span></div>
              <div className="kpi-val">{forecastData.filter(d => !d.actual).length} Months</div>
            </div>
            <div className="card fc-stat-card">
              <div className="kpi-top"><span className="kpi-ico">📈</span><span className="kpi-lbl">Predicted Peak Demand</span></div>
              <div className="kpi-val">{Math.max(...forecastData.map(d => d.predicted)).toLocaleString()} Units</div>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="card chart-card page-section" style={{ minHeight:"280px" }}>
        <div className="card-title">📊 Demand Forecast Trend</div>
        {loading
          ? <div className="skeleton" style={{ height:"220px", borderRadius:"8px" }}></div>
          : <LineChart data={forecastData.map(d => ({ month:d.month, actual:d.actual, forecast:d.predicted }))} />
        }
      </div>

      {/* Table */}
      <div className="card page-section" style={{ padding:"1.2rem" }}>
        <div className="card-title">📋 Monthly Forecast Breakdown</div>
        <div className="fc-table-wrap">
          <table className="fc-table">
            <thead>
              <tr>
                <th>Month</th><th>Actual</th><th>Predicted</th><th>Accuracy</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((d, i) => (
                <tr key={i} className="animate-fadeUp" style={{ animationDelay:`${i * 0.05}s` }}>
                  <td><strong>{d.month}</strong></td>
                  <td>{d.actual ? d.actual.toLocaleString() : <span style={{color:"var(--t-faint)"}}>—</span>}</td>
                  <td>{d.predicted.toLocaleString()}</td>
                  <td>
                    {d.accuracy
                      ? <span className={`badge ${d.accuracy >= 97 ? "badge-success" : d.accuracy >= 95 ? "badge-info" : "badge-warn"}`}>{d.accuracy}%</span>
                      : <span className="badge badge-purple">Pending</span>
                    }
                  </td>
                  <td>
                    <span className={`badge ${d.actual ? "badge-success" : "badge-purple"}`}>
                      {d.actual ? "Completed" : "Forecast"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}