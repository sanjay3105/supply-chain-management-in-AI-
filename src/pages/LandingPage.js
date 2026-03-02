import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

const features = [
  { icon:"📈", title:"AI Demand Forecasting",   desc:"Predict demand with 94%+ accuracy using LSTM & ARIMA models trained on your historical data." },
  { icon:"📦", title:"Inventory Optimization",  desc:"Eliminate stockouts and overstock with automated reorder triggers and smart allocation." },
  { icon:"🔗", title:"Supplier Risk Analysis",  desc:"Monitor supplier health with real-time scoring, compliance tracking, and anomaly detection." },
  { icon:"🧠", title:"Prescriptive Analytics",  desc:"Get AI-generated action recommendations — not just insights, but what to do next." },
  { icon:"🔒", title:"Document Authentication", desc:"NLP-powered OCR verifies supplier certificates and detects tampering automatically." },
  { icon:"📊", title:"Real-time Dashboard",     desc:"Unified command center with KPIs, alerts, charts, and team collaboration built in." },
];

const technologies = [
  { name:"Python",        color:"#f0c040" },
  { name:"React JS",      color:"#38bdf8" },
  { name:"TensorFlow",    color:"#f97316" },
  { name:"LSTM / ARIMA",  color:"#a78bfa" },
  { name:"PostgreSQL",    color:"#22c55e" },
  { name:"Scikit-learn",  color:"#ef4444" },
  { name:"Flask API",     color:"#34d399" },
  { name:"Random Forest", color:"#c084fc" },
];

const stats = [
  { val:"94%",  lbl:"Forecast Accuracy" },
  { val:"3×",   lbl:"Faster Decisions"  },
  { val:"40%",  lbl:"Cost Reduction"    },
  { val:"200+", lbl:"Data Points / SKU" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lp-root">

      {/* NAVBAR */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo" onClick={() => scrollTo("hero")}>
            <span className="lp-hex">⬡</span>
            <span className="lp-brand">SupplyAI</span>
          </div>
          <div className="lp-links">
            <button onClick={() => scrollTo("features")}>Features</button>
            <button onClick={() => scrollTo("tech")}>Technology</button>
            <button onClick={() => scrollTo("about")}>About</button>
          </div>
          <div className="lp-actions">
            <button className="btn btn-outline btn-sm" onClick={() => navigate("/dashboard")}>Sign In</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/dashboard")}>Get Started →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero" id="hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-grid-bg"></div>

        <div className="hero-content animate-fadeUp">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            AI-Powered · Real-time · Intelligent
          </div>
          <h1 className="hero-title">
            A Smarter Platform for<br />
            <em className="hero-em">Supply Chain</em> Nerds
          </h1>
          <p className="hero-subtitle">
            Built for operations experts — predictive forecasting, zero stockouts,
            and supplier risk analysis all in one unified dashboard.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard")}>
              Launch Dashboard →
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => scrollTo("features")}>
              Explore Features
            </button>
          </div>
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.val} className="hero-stat">
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Dashboard Visual */}
        <div className="hero-visual animate-fadeUp" style={{ animationDelay: "0.2s" }}>
          <div className="mock-dash glass">
            <div className="mock-topbar">
              <div className="mock-dots"><span></span><span></span><span></span></div>
              <span className="mock-title">Supply Chain Intelligence</span>
            </div>
            <div className="mock-kpis">
              {["₹8,45,000", "94.2%", "₹32L", "72 / 100"].map((v, i) => (
                <div key={i} className="mock-kpi">
                  <div className="skeleton" style={{ width:"60%", height:"8px", borderRadius:"4px" }}></div>
                  <div className="mock-kpi-val">{v}</div>
                </div>
              ))}
            </div>
            <div className="mock-chart">
              <svg viewBox="0 0 280 80" width="100%" height="80">
                <defs>
                  <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="0,80 0,65 40,50 80,45 120,30 160,28 200,18 240,14 280,10 280,80" fill="url(#mg)" />
                <polyline points="0,65 40,50 80,45 120,30 160,28 200,18 240,14 280,10" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                <polyline points="0,70 40,60 80,55 120,50 160,45 200,40 240,38 280,35" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features" id="features">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Everything you need to run a smarter supply chain</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <article key={i} className="feature-card card animate-fadeUp"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="f-icon">{f.icon}</div>
              <h3 className="f-title">{f.title}</h3>
              <p className="f-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="lp-tech" id="tech">
        <div className="section-label">Built With</div>
        <h2 className="section-title">Enterprise-grade technology stack</h2>
        <div className="tech-pills">
          {technologies.map(t => (
            <div key={t.name} className="tech-pill" style={{ "--pill-color": t.color }}>
              <span className="pill-dot" style={{ background: t.color }}></span>
              {t.name}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta" id="about">
        <div className="cta-glow"></div>
        <h2 className="cta-title">Ready to transform your supply chain?</h2>
        <p className="cta-sub">Join operations teams making smarter decisions every day with AI.</p>
        <div className="cta-btns">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard")}>Open Dashboard →</button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate("/forecast")}>Try Demand Forecast</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="footer-logo">
          <span className="lp-hex">⬡</span>
          <span className="lp-brand">SupplyAI</span>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/forecast")}>Forecast</button>
          <button onClick={() => navigate("/inventory")}>Inventory</button>
          <button onClick={() => navigate("/supplier")}>Suppliers</button>
        </div>
        <p className="footer-copy">© 2026 SupplyAI — AI-Powered Supply Chain Intelligence</p>
      </footer>
    </div>
  );
}