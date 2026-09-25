function Sidebar({ isOpen, userRole, onNavigate }) {
  const navItems = {
    department: [
      { label: "Dashboard", icon: "📊", view: "dashboard" },
      { label: "Challenges", icon: "🎯", view: "challenges" },
      { label: "Startups", icon: "🚀", view: "startups" },
      { label: "Pilots", icon: "🧪", view: "pilots" },
      { label: "Payments", icon: "💰", view: "payments" }
    ],
    startup: [
      { label: "Dashboard", icon: "📊", view: "dashboard" },
      { label: "Challenges", icon: "🎯", view: "challenges" },
      { label: "My Applications", icon: "📝", view: "applications" },
      { label: "My Pilots", icon: "🧪", view: "pilots" }
    ],
    admin: [
      { label: "Dashboard", icon: "📊", view: "dashboard" },
      { label: "All Startups", icon: "🚀", view: "startups" },
      { label: "All Challenges", icon: "🎯", view: "challenges" },
      { label: "All Pilots", icon: "🧪", view: "pilots" },
      { label: "Payments", icon: "💰", view: "payments" },
      { label: "Risk Monitor", icon: "⚠️", view: "risk" }
    ],
    expert: [
      { label: "Dashboard", icon: "📊", view: "dashboard" },
      { label: "Evaluations", icon: "✅", view: "evaluations" },
      { label: "Verifications", icon: "🔍", view: "verifications" }
    ],
    public: [
      { label: "Home", icon: "🏠", view: "home" },
      { label: "Pilots", icon: "🧪", view: "pilots" },
      { label: "Solutions", icon: "💡", view: "solutions" }
    ]
  };

  const items = navItems[userRole] || [];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">
          GI
        </span>
        <div className="brand-text">
          <span className="brand-name">GovInnovate</span>
          <span className="brand-tag">SIH 2026 • PS 136</span>
        </div>
      </div>

      <nav id="sidebarNav" className="sidebar-nav">
        {items.map((item, index) => (
          <button
            key={index}
            className="nav-item"
            data-view={item.view}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="demo-mode-pill">● Demo Mode</div>
        <button className="link-btn small" data-action="reset-demo">
          Reset Demo Data
        </button>
        <button className="link-btn small" data-action="logout">
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;