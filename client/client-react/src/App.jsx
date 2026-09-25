import { useState, useEffect } from "react";
import LandingView from "./views/LandingView";
import LoginView from "./views/LoginView";
import AppShell from "./views/AppShell";
import "./styles/style.css";
import "./styles/components.css";
import "./styles/dashboard.css";
import "./styles/expert.css";
import "./styles/public.css";
import "./styles/responsive.css";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  // Handle navigation between views
  const navigateTo = (view) => {
    setCurrentView(view);
  };

  // Handle login
  const handleLogin = (role, data) => {
    setUserRole(role);
    setUserData(data);
    navigateTo("app");
  };

  // Handle logout
  const handleLogout = () => {
    setUserRole(null);
    setUserData(null);
    navigateTo("landing");
  };

  return (
    <div className="app-container">
      {currentView === "landing" && <LandingView onNavigate={navigateTo} />}
      {currentView === "login" && (
        <LoginView onNavigate={navigateTo} onLogin={handleLogin} />
      )}
      {currentView === "app" && (
        <AppShell
          userRole={userRole}
          userData={userData}
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
}

export default App;