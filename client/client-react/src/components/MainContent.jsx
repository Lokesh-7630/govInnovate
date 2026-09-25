function MainContent({ userRole, userData, onLogout, onResetDemo }) {
  return (
    <main id="mainContent" className="main-content">
      {/* Toast notifications */}
      <div id="toastHost" className="toast-host" aria-live="polite"></div>

      {/* Modal root */}
      <div id="modalRoot"></div>

      {/* Dynamic content will be rendered here based on navigation */}
      <div className="content-area">
        <h1>Welcome, {userData?.name}!</h1>
        <p>Role: {userRole}</p>
        <p>Your dashboard content will load here based on your role.</p>
      </div>
    </main>
  );
}

export default MainContent;