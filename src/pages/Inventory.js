import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { inventoryData } from "../data/sampleData";
import "../styles/theme.css";

const statusConfig = {
  instock:  { label:"In Stock", cls:"badge-success" },
  low:      { label:"Low",      cls:"badge-warn"    },
  critical: { label:"Critical", cls:"badge-danger"  },
};

export default function InventoryPage() {
  const { addToast } = useOutletContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = inventoryData
    .filter(item => filter === "all" || item.status === filter)
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "name"   ? a.name.localeCompare(b.name)     :
      sortBy === "stock"  ? b.stock - a.stock                :
      sortBy === "status" ? a.status.localeCompare(b.status) : 0
    );

  const counts = {
    total:    inventoryData.length,
    instock:  inventoryData.filter(d => d.status === "instock").length,
    low:      inventoryData.filter(d => d.status === "low").length,
    critical: inventoryData.filter(d => d.status === "critical").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title-lg">Inventory Optimization</h1>
          <p className="page-subtitle">{counts.total} SKUs tracked · {counts.critical} critical</p>
        </div>
        <button className="btn btn-primary btn-sm"
          onClick={() => addToast("Inventory report exported!", "success")}>
          📥 Export
        </button>
      </div>

      {/* Summary Tiles */}
      <div className="inv-summary page-section">
        {[
          { label:"Total SKUs",  val:counts.total,    color:"var(--accent)"  },
          { label:"In Stock",    val:counts.instock,  color:"var(--success)" },
          { label:"Low Stock",   val:counts.low,      color:"var(--warn)"    },
          { label:"Critical",    val:counts.critical, color:"var(--danger)"  },
        ].map(s => (
          <div key={s.label} className="card inv-tile">
            <span className="inv-tile-val" style={{ color:s.color }}>{s.val}</span>
            <span className="inv-tile-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="card page-section">
        <div className="inv-filters">
          <div className="inv-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="db-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="instock">In Stock</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
          </select>
          <select className="db-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="stock">Sort: Stock</option>
            <option value="status">Sort: Status</option>
          </select>
          <span className="inv-count">{filtered.length} items</span>
        </div>

        <div className="inv-table-wrap">
          <table className="fc-table inv-table">
            <thead>
              <tr>
                <th>SKU</th><th>Product Name</th><th>Category</th>
                <th>Stock</th><th>Reorder Pt.</th><th>Value</th>
                <th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id}
                  className={`animate-fadeUp ${item.status === "critical" ? "row-critical" : item.status === "low" ? "row-low" : ""}`}
                  style={{ animationDelay:`${i * 0.04}s` }}>
                  <td><code className="sku-code">{item.sku}</code></td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.category}</td>
                  <td>
                    <span className={item.stock === 0 ? "stock-zero" : item.stock <= item.reorder ? "stock-low" : ""}>
                      {item.stock === 0 ? "Out of Stock" : item.stock.toLocaleString()}
                    </span>
                  </td>
                  <td>{item.reorder}</td>
                  <td>{item.value}</td>
                  <td><span className={`badge ${statusConfig[item.status].cls}`}>{statusConfig[item.status].label}</span></td>
                  <td>
                    {item.status !== "instock" && (
                      <button className="btn btn-ghost btn-sm"
                        onClick={() => addToast(`Reorder triggered for ${item.name}`, "success")}>
                        ↩ Reorder
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="inv-empty">No items match your search</div>
          )}
        </div>
      </div>
    </div>
  );
}