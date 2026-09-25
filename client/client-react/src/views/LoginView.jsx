function LoginView({ onNavigate, onLogin }) {
  const handleRoleLogin = (role) => {
    // Demo login - in production, this would call your backend
    const demoUserData = {
      id: 1,
      name: `Demo ${role} User`,
      email: `${role}@demo.gov.in`,
      role: role
    };

    onLogin(role, demoUserData);
  };

  return (
    <section id="view-login" className="view" hidden>
      <div className="login-shell">
        <div className="login-panel">
          <span className="brand-mark" aria-hidden="true">
            GI
          </span>
          <h2>Sign in to GovInnovate</h2>
          <p className="muted">
            Select a role to continue. This is a prototype — no real
            authentication is performed.
          </p>

          <div className="role-cards">
            <div className="role-card">
              <h3>Government Department</h3>
              <p>
                Create challenges, match startups, govern pilots and release
                payments.
              </p>
              <button
                className="btn btn-primary btn-block"
                data-action="login"
                data-role="department"
                onClick={() => handleRoleLogin("department")}
              >
                Demo Login
              </button>
            </div>
            <div className="role-card">
              <h3>Startup</h3>
              <p>
                Discover challenges, apply, track pilots and submit milestone
                evidence.
              </p>
              <button
                className="btn btn-primary btn-block"
                data-action="login"
                data-role="startup"
                onClick={() => handleRoleLogin("startup")}
              >
                Demo Login
              </button>
            </div>
            <div className="role-card">
              <h3>Program Administrator</h3>
              <p>
                Oversee the full program — startups, challenges, pilots,
                payments and risk.
              </p>
              <button
                className="btn btn-primary btn-block"
                data-action="login"
                data-role="admin"
                onClick={() => handleRoleLogin("admin")}
              >
                Demo Login
              </button>
            </div>
            <div className="role-card">
              <h3>Expert / Verifier</h3>
              <p>
                Independently evaluate technical feasibility, verify evidence
                and validate pilot outcomes.
              </p>
              <button
                className="btn btn-primary btn-block"
                data-action="login"
                data-role="expert"
                onClick={() => handleRoleLogin("expert")}
              >
                Demo Login
              </button>
            </div>
            <div className="role-card">
              <h3>General User / Beneficiary</h3>
              <p>
                View eligible pilots and deployed solutions as a citizen,
                beneficiary or service user, and share feedback.
              </p>
              <button
                className="btn btn-primary btn-block"
                data-action="login"
                data-role="public"
                onClick={() => handleRoleLogin("public")}
              >
                Demo Login
              </button>
            </div>
          </div>
          <button
            className="link-btn"
            data-action="goto-landing"
            onClick={() => onNavigate("landing")}
          >
            ← Back to landing page
          </button>
        </div>
      </div>
    </section>
  );
}

export default LoginView;