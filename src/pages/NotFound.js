import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="nf-root">
      <div className="nf-glow"></div>
      <div className="nf-content animate-fadeUp">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-sub">
          The route you're looking for doesn't exist in the supply chain.
        </p>
        <div className="nf-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard")}>
            ↩ Back to Dashboard
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}