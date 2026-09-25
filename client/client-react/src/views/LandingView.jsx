import { useEffect } from "react";

function LandingView({ onNavigate }) {
  useEffect(() => {
    // Add event listeners for buttons
    const handleExploreClick = () => onNavigate("login");
    const handleDemoClick = () => {
      console.log("Running demo scenario...");
      // Add your demo logic here
    };

    const exploreButtons = document.querySelectorAll('[data-action="goto-login"]');
    const demoButtons = document.querySelectorAll('[data-action="run-demo-scenario"]');

    exploreButtons.forEach((btn) => btn.addEventListener("click", handleExploreClick));
    demoButtons.forEach((btn) => btn.addEventListener("click", handleDemoClick));

    return () => {
      exploreButtons.forEach((btn) => btn.removeEventListener("click", handleExploreClick));
      demoButtons.forEach((btn) => btn.removeEventListener("click", handleDemoClick));
    };
  }, [onNavigate]);

  return (
    <section id="view-landing" className="view">
      <header className="landing-nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            GI
          </span>
          <div className="brand-text">
            <span className="brand-name">GovInnovate</span>
            <span className="brand-tag">SIH 2026 • PS 136 Prototype</span>
          </div>
        </div>
        <button className="btn btn-primary" data-action="goto-login">
          Explore Platform
        </button>
      </header>

      <div className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">Innovation-to-Procurement Platform</p>
          <h1>From Innovation to Procurement</h1>
          <p className="hero-sub">
            Helping Government Departments discover, verify, pilot and validate
            startup innovation before it ever reaches a purchase order.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              data-action="goto-login"
            >
              Explore Platform
            </button>
            <button
              className="btn btn-ghost btn-lg"
              data-action="run-demo-scenario"
            >
              View Demo
            </button>
          </div>
          <p className="hero-disclaimer">
            Prototype for demonstration purposes only — not an official
            Government of India portal.
          </p>
        </div>
        <div className="hero-flow" aria-hidden="true">
          <div className="flow-step">
            <span>VERIFY</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <span>MATCH</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <span>PILOT</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <span>VALIDATE</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <span>PROCURE</span>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Discover Innovation</h3>
          <p>
            AI-assisted challenge-to-startup matching surfaces the right
            solutions from a verified startup pool.
          </p>
        </div>
        <div className="feature-card">
          <h3>Govern Pilots</h3>
          <p>
            Milestone-driven pilot tracking with evidence validation before any
            payment is released.
          </p>
        </div>
        <div className="feature-card">
          <h3>Enable Procurement</h3>
          <p>
            Verified startup eligibility and a structured transition from pilot
            success into procurement.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LandingView;