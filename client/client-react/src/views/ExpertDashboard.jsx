import React, { useState, useEffect } from "react";

function ExpertDashboard({ userData, currentView }) {
  const [assignedChallenges, setAssignedChallenges] = useState([]);
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    if (currentView === 'assigned') {
      fetchAssignedChallenges();
    } else if (currentView === 'evaluate') {
      fetchStartupsToEvaluate();
    }
  }, [currentView]);

  const fetchAssignedChallenges = async () => {
    // Mock data - replace with actual API call
    setAssignedChallenges([
      { id: 1, title: 'Smart Traffic Management', sector: 'Smart Cities', startups_count: 5 },
      { id: 2, title: 'Digital Health Records', sector: 'Healthcare', startups_count: 3 },
    ]);
  };

  const fetchStartupsToEvaluate = async () => {
    // Mock data - replace with actual API call
    setStartups([
      { id: 1, name: 'TechVision Solutions', challenge: 'Smart Traffic Management', score: 85 },
      { id: 2, name: 'HealthTech Plus', challenge: 'Digital Health Records', score: 78 },
    ]);
  };

  if (currentView === 'assigned') {
    return (
      <div>
        <h2 style={styles.heading}>Assigned Challenges</h2>
        
        {assignedChallenges.length === 0 ? (
          <p>No challenges assigned yet.</p>
        ) : (
          <div style={styles.cardsGrid}>
            {assignedChallenges.map((challenge) => (
              <div key={challenge.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{challenge.title}</h3>
                <p style={styles.cardMeta}><strong>Sector:</strong> {challenge.sector}</p>
                <p style={styles.cardMeta}><strong>Startups to Evaluate:</strong> {challenge.startups_count}</p>
                <button style={styles.actionButton}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'evaluate') {
    return (
      <div>
        <h2 style={styles.heading}>Startups to Evaluate</h2>
        
        {startups.length === 0 ? (
          <p>No startups assigned for evaluation.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Startup</th>
                <th>Challenge</th>
                <th>AI Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {startups.map((startup) => (
                <tr key={startup.id}>
                  <td>{startup.name}</td>
                  <td>{startup.challenge}</td>
                  <td>
                    <span style={styles.scoreBadge}>{startup.score}%</span>
                  </td>
                  <td>
                    <button style={styles.evaluateButton}>Evaluate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 style={styles.heading}>Welcome, {userData?.name}!</h2>
      <p style={styles.welcomeText}>
        You are logged in as an <strong>Expert</strong>. Evaluate startups and help select the best solutions for government challenges.
      </p>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>Assigned Challenges</h3>
          <p style={styles.statNumber}>{assignedChallenges.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Startups to Evaluate</h3>
          <p style={styles.statNumber}>{startups.length}</p>
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
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '20px',
    color: '#667eea',
    margin: '0 0 15px 0',
  },
  cardMeta: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  actionButton: {
    marginTop: '15px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    background: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  scoreBadge: {
    padding: '6px 14px',
    background: '#667eea',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  evaluateButton: {
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default ExpertDashboard;