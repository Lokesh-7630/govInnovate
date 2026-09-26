import React, { useState, useEffect } from "react";

function StartupDashboard({ userData, currentView }) {
  const [challenges, setChallenges] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    if (currentView === 'challenges') {
      fetchChallenges();
    } else if (currentView === 'applications') {
      fetchApplications();
    }
  }, [currentView]);

  const fetchChallenges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/challenges');
      const data = await response.json();
      if (data.success) {
        setChallenges(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (challenge) => {
    setSelectedChallenge(challenge);
    setShowApplyForm(true);
  };

  if (currentView === 'challenges') {
    return (
      <div>
        <h2 style={styles.heading}>Available Challenges</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : challenges.length === 0 ? (
          <p>No challenges available.</p>
        ) : (
          <div style={styles.challengesGrid}>
            {challenges.map((challenge) => (
              <div key={challenge.id} style={styles.challengeCard}>
                <h3 style={styles.challengeTitle}>{challenge.title}</h3>
                <p style={styles.challengeDescription}>{challenge.description}</p>
                <div style={styles.challengeMeta}>
                  <span><strong>Sector:</strong> {challenge.sector}</span>
                  <span><strong>Budget:</strong> ₹{(challenge.budget_min || 0).toLocaleString()} - ₹{(challenge.budget_max || 0).toLocaleString()}</span>
                  <span><strong>Timeline:</strong> {challenge.timeline_months || 0} months</span>
                  <span><strong>Deadline:</strong> {new Date(challenge.application_deadline).toLocaleDateString()}</span>
                </div>
                <button 
                  style={styles.applyButton}
                  onClick={() => handleApply(challenge)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {showApplyForm && (
          <ApplyForm 
            challenge={selectedChallenge}
            onClose={() => setShowApplyForm(false)}
          />
        )}
      </div>
    );
  }

  if (currentView === 'applications') {
    return (
      <div>
        <h2 style={styles.heading}>My Applications</h2>
        
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Challenge</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.challenge_title}</td>
                  <td>
                    <span style={{
                      ...styles.status,
                      ...getStatusStyle(app.status)
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.submitted_at).toLocaleDateString()}</td>
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
        You are logged in as a <strong>Startup</strong>. Navigate to Challenges to view and apply for government opportunities.
      </p>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>Available Challenges</h3>
          <p style={styles.statNumber}>{challenges.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>My Applications</h3>
          <p style={styles.statNumber}>{applications.length}</p>
        </div>
      </div>
    </div>
  );
}

function ApplyForm({ challenge, onClose }) {
  const [formData, setFormData] = useState({
    startup_name: '',
    founder_name: '',
    email: '',
    phone: '',
    dpiit_number: '',
    sector: '',
    stage: '',
    description: '',
    team_size: '',
    funding_raised: '',
    website: '',
    pitch_deck: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Here you would upload the PDF and create application
    // For now, just close the form
    alert('Application submitted successfully! (Demo)');
    setSubmitting(false);
    onClose();
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>Apply for: {challenge?.title}</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Startup Name *</label>
              <input
                type="text"
                style={styles.input}
                value={formData.startup_name}
                onChange={(e) => setFormData({...formData, startup_name: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Founder Name *</label>
              <input
                type="text"
                style={styles.input}
                value={formData.founder_name}
                onChange={(e) => setFormData({...formData, founder_name: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                style={styles.input}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone *</label>
              <input
                type="tel"
                style={styles.input}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>DPIIT Number *</label>
              <input
                type="text"
                style={styles.input}
                value={formData.dpiit_number}
                onChange={(e) => setFormData({...formData, dpiit_number: e.target.value})}
                placeholder="e.g., DIPP12345"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Sector *</label>
              <input
                type="text"
                style={styles.input}
                value={formData.sector}
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Stage *</label>
              <select
                style={styles.input}
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                required
              >
                <option value="">Select stage</option>
                <option value="Early Stage">Early Stage</option>
                <option value="Growth Stage">Growth Stage</option>
                <option value="Scale Up">Scale Up</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Team Size *</label>
              <input
                type="number"
                style={styles.input}
                value={formData.team_size}
                onChange={(e) => setFormData({...formData, team_size: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Funding Raised (₹) *</label>
              <input
                type="number"
                style={styles.input}
                value={formData.funding_raised}
                onChange={(e) => setFormData({...formData, funding_raised: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Website</label>
              <input
                type="url"
                style={styles.input}
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              style={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Pitch Deck (PDF) *</label>
            <input
              type="file"
              style={styles.input}
              accept=".pdf"
              onChange={(e) => setFormData({...formData, pitch_deck: e.target.files[0]})}
              required
            />
          </div>

          <div style={styles.formActions}>
            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const getStatusStyle = (status) => {
  switch(status) {
    case 'approved': return { background: '#d4edda', color: '#155724' };
    case 'rejected': return { background: '#f8d7da', color: '#721c24' };
    default: return { background: '#fff3cd', color: '#856404' };
  }
};

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
  challengesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
  },
  challengeCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  challengeTitle: {
    fontSize: '22px',
    color: '#667eea',
    margin: 0,
  },
  challengeDescription: {
    color: '#666',
    lineHeight: '1.6',
    flex: 1,
  },
  challengeMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    color: '#555',
    padding: '15px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
  },
  applyButton: {
    padding: '12px 25px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    alignSelf: 'flex-start',
  },
  table: {
    width: '100%',
    background: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  status: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '24px',
    marginBottom: '25px',
    color: '#667eea',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '12px 15px',
    border: '2px solid #eee',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
  },
  textarea: {
    padding: '12px 15px',
    border: '2px solid #eee',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    paddingTop: '20px',
  },
  submitButton: {
    padding: '14px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '14px 30px',
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default StartupDashboard;