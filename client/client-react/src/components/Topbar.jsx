function Topbar({
  onToggleSidebar,
  onToggleNotifications,
  showNotifPanel,
  notifications,
  userData,
  onLoadDemoScenario
}) {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <header className="topbar">
      <button
        className="icon-btn sidebar-toggle"
        data-action="toggle-sidebar"
        aria-label="Toggle navigation"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <div className="global-search">
        <input
          id="globalSearchInput"
          type="text"
          placeholder="Search startups, challenges, pilots, departments…"
          autoComplete="off"
        />
        <div id="globalSearchResults" className="search-results" hidden></div>
      </div>

      <div className="topbar-actions">
        <button
          className="btn btn-secondary"
          data-action="run-demo-scenario"
          onClick={onLoadDemoScenario}
        >
          Load SIH Demo Scenario
        </button>

        <div className="notif-wrap">
          <button
            className="icon-btn"
            data-action="toggle-notifications"
            aria-label="Notifications"
            onClick={onToggleNotifications}
          >
            🔔
            {hasUnread && (
              <span id="notifBadge" className="badge-dot"></span>
            )}
          </button>

          {showNotifPanel && (
            <div id="notifPanel" className="notif-panel">
              {notifications.length === 0 ? (
                <p className="muted">No notifications</p>
              ) : (
                notifications.map((notif, index) => (
                  <div key={index} className="notif-item">
                    <p>{notif.message}</p>
                    <span className="muted">{notif.time}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="user-chip" id="userChip">
          {userData && (
            <>
              <span className="user-avatar">
                {userData.name.charAt(0).toUpperCase()}
              </span>
              <span className="user-name">{userData.name}</span>
              <span className="user-role">{userData.role}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;