import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import KPICard from "../components/KPICard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import { SkeletonCard } from "../components/SkeletonLoader";
import { kpiData, salesTrendData, categoryData, recentActivity } from "../data/sampleData";
import "../styles/theme.css";

const statusIcon = { info:"ℹ️", warning:"⚠️", danger:"🔴", success:"✅" };

export default function Dashboard() {
  const { addToast } = useOutletContext();
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState("all");
  const [timeRange, setTimeRange] = useState("6m");

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      addToast("Dashboard data loaded successfully", "success");
    }, 1200);
    return () => clearTimeout(t);
  }, [addToast]);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title-lg">Overview</h1>
          <p className="page-subtitle">Real-time supply chain performance metrics</p>
        </div>
        <div className="card-actions">
          <select className="db-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="apparel">Apparel</option>
            <option value="grocery">Grocery</option>
          </select>
          <select className="db-select" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
          </select>
          <button className="btn btn-primary btn-sm"
            onClick={() => addToast("Report exported as CSV!", "success")}>
            📥 Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid page-section">
        {loading
          ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : kpiData.map((k, i) => <KPICard key={k.id} {...k} delay={i * 80} />)
        }
      </div>

      {/* Charts */}
      <div className="chart-grid page-section">
        <div className="card chart-card">
          <div className="card-title-row">
            <span className="card-title">📊 Sales &amp; Forecast Trend</span>
          </div>
          {loading
            ? <div className="skeleton" style={{ height:"200px", borderRadius:"8px" }}></div>
            : <LineChart data={salesTrendData} />
          }
        </div>
        <div className="card chart-card">
          <div className="card-title">📦 Category Distribution</div>
          {loading
            ? <div className="skeleton" style={{ height:"200px", borderRadius:"8px" }}></div>
            : <BarChart data={categoryData} />
          }
        </div>
      </div>

      {/* Activity */}
      <div className="card activity-card page-section">
        <div className="card-title-row">
          <span className="card-title">🕐 Recent Activity</span>
          <span className="activity-count">{recentActivity.length} events</span>
        </div>
        <div className="activity-list">
          {recentActivity.map((a, i) => (
            <div key={a.id} className="activity-item animate-fadeUp"
              style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="act-icon">{statusIcon[a.status]}</span>
              <div className="act-body">
                <span className="act-msg">{a.msg}</span>
                <span className="act-time">{a.time}</span>
              </div>
              <span className={`badge badge-${
                a.status === "info"    ? "info"    :
                a.status === "warning" ? "warn"    :
                a.status === "danger"  ? "danger"  : "success"
              }`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}