import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar  from "../components/Topbar";
import ToastContainer from "../components/ToastContainer";
import { useToast } from "../hooks/useToast";
import "../styles/theme.css";

export default function DashboardLayout({ theme, toggleTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className={`dl-root ${collapsed ? "dl-collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="dl-body">
        <Topbar
          theme={theme}
          toggleTheme={toggleTheme}
          collapsed={collapsed}
          addToast={addToast}
        />
        <main className="dl-main">
          <Outlet context={{ addToast }} />
        </main>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}