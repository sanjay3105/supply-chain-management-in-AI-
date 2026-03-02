import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout  from "./layouts/DashboardLayout";
import LandingPage      from "./pages/LandingPage";
import Dashboard        from "./pages/Dashboard";
import ForecastPage     from "./pages/Forecast";
import InventoryPage    from "./pages/Inventory";
import SupplierRiskPage from "./pages/Supplier";
import NotFound         from "./pages/NotFound";
import "./styles/theme.css";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("supplyai-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("supplyai-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard pages — all share DashboardLayout */}
        <Route element={
          <DashboardLayout theme={theme} toggleTheme={toggleTheme} />
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forecast"  element={<ForecastPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/supplier"  element={<SupplierRiskPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}