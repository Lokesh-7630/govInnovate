import React, { useState, useEffect } from "react";

function AdminDashboard({ userData, currentView }) {
  const [stats, setStats] = useState({
    users: 0,
    challenges: 0,
    applications: 0,
    pilots: 0,
  });
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    if (currentView === 'challenges') {
      fetchChallenges();
    }
  }, [currentView]);

  const fetchStats = async () => {
    setStats({
      users: 24,
      challenges: 3,
      applications: 8,
      pilots: 2,
    });
  };

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/challenges', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setChallenges(result.data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  // Challenges View
  if (currentView === 'challenges') {
    return (
      <div>
        <h2 style={styles.heading}>All Challenges</h2>
        
        {loading ? (
          <p>Loading challenges...</p>
        ) : (
          <div style={styles.challengesList}>
            {challenges.map((challenge) => (
              <div key={challenge.id} style={styles.challengeCard}>
                <h3 style={styles.challengeTitle}>{challenge.title}</h3>
                <p style={styles.challengeDescription}>{challenge.description}</p>
                
                <div style={styles.challengeGrid}>
                  <div>
                    <strong>Sector:</strong> {challenge.sector}
                  </div>
                  <div>
                    <strong>Department:</strong> {challenge.department}
                  </div>
                  <div>
                    <strong>Budget:</strong> ₹{(parseInt(challenge.budget_min) / 100000).toFixed(1)}L - ₹{(parseInt(challenge.budget_max) / 100000).toFixed(1)}L
                  </div>
                  <div>
                    <strong>Timeline:</strong> {challenge.timeline_months} months
                  </div>
                  <div>
                    <strong>Status:</strong> 
                    <span style={{
                      ...styles.badge,
                      background: challenge.status === 'open' ? '#10b981' : '#6b7280'
                    }}>
                      {challenge.status}
                    </span>
                  </div>
                  <div>
                    <strong>Deadline:</strong> {new Date(challenge.application_deadline).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
            
            {challenges.length === 0 && (
              <p style={styles.emptyText}>No challenges found.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Users View
  if (currentView === 'users') {
    return (
      <div>
        <h2 style={styles.heading}>User Management</h2>
        <p>User management table will go here...</p>
      </div>
    );
  }

  // Analytics View
  if (currentView === 'analytics') {
    return (
      <div>
        <h2 style={styles.heading}>Analytics Dashboard</h2>
        <p>Analytics and charts will go here...</p>
      </div>
    );
  }

  // Default Dashboard View
  return (
    <div>
      <h2 style={styles.heading}>Welcome, {userData?.name}!</h2>
      <p style={styles.welcomeText}>
        You are logged in as <strong>Admin</strong>. Full system oversight and management.
      </p>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>Total Users</h3>
          <p style={styles.statNumber}>{stats.users}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Challenges</h3>
          <p style={styles.statNumber}>{stats.challenges}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Applications</h3>
          <p style={styles.statNumber}>{stats.applications}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Active Pilots</h3>
          <p style={styles.statNumber}>{stats.pilots}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#333',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  statNumber: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '10px 0 0 0',
  },
  challengesList: {
    display: 'grid',
    gap: '20px',
  },
  challengeCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  challengeTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
  },
  challengeDescription: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  challengeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    fontSize: '14px',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    marginLeft: '8px',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: '40px',
  },
};

export default AdminDashboard;