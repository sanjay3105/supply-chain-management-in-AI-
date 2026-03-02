import { NavLink, useNavigate } from "react-router-dom";
import "../styles/theme.css";

const navLinks = [
  { to:"/dashboard", icon:"⬡",  label:"Dashboard"       },
  { to:"/forecast",  icon:"📈", label:"Demand Forecast"  },
  { to:"/inventory", icon:"📦", label:"Inventory"        },
  { to:"/supplier",  icon:"🔗", label:"Supplier Risk"    },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* Brand */}
      <div className="sb-brand" onClick={() => navigate("/")}>
        <span className="sb-hex">⬡</span>
        {!collapsed && <span className="sb-name">AI SUPPLY</span>}
      </div>

      {/* Collapse Toggle */}
      <button className="sb-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>

      {/* Nav Links */}
      <nav className="sb-nav">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sb-link ${isActive ? "sb-active" : ""}`}
          >
            <span className="sb-ico">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="sb-footer">
          <span className="sb-dot"></span>
          <span>System Online</span>
        </div>
      )}
    </aside>
  );
}