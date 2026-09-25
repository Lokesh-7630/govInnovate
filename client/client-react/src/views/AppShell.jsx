import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MainContent from "../components/MainContent";

function AppShell({ userRole, userData, onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifPanel(!showNotifPanel);
  };

  const handleResetDemo = () => {
    console.log("Resetting demo data...");
    // Add your reset logic here
    onLogout();
  };

  const handleLoadDemoScenario = () => {
    console.log("Loading SIH demo scenario...");
    // Add your demo scenario logic here
  };

  return (
    <section id="view-app" className="view app-shell" hidden>
      <Sidebar
        isOpen={sidebarOpen}
        userRole={userRole}
        onNavigate={onNavigate}
      />

      <div className="app-main">
        <Topbar
          onToggleSidebar={toggleSidebar}
          onToggleNotifications={toggleNotifications}
          showNotifPanel={showNotifPanel}
          notifications={notifications}
          userData={userData}
          onLoadDemoScenario={handleLoadDemoScenario}
        />

        <MainContent
          userRole={userRole}
          userData={userData}
          onLogout={onLogout}
          onResetDemo={handleResetDemo}
        />
      </div>
    </section>
  );
}

export default AppShell;