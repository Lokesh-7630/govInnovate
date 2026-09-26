import React, { useState, useEffect } from "react";

function GovernmentDashboard({ userData, currentView }) {
  const [challenges, setChallenges] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (currentView === 'challenges' || currentView === 'create-challenge') {
      fetchChallenges();
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
    }
  };

  if (currentView === 'create-challenge') {
    return (
      <div>
        <h2 style={styles.heading}>Create New Challenge</h2>
        <CreateChallengeForm 
          onSuccess={() => {
            setShowCreateForm(false);
            fetchChallenges();
          }}
        />
      </div>
    );
  }

  if (currentView === 'challenges') {
    return (
      <div>
        <h2 style={styles.heading}>All Challenges</h2>
        
        {challenges.length === 0 ? (
          <p>No challenges yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Sector</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td>{challenge.title}</td>
                  <td>{challenge.sector}</td>
                  <td>₹{(challenge.budget_min || 0).toLocaleString()} - ₹{(challenge.budget_max || 0).toLocaleString()}</td>
                  <td>{challenge.timeline_months || 0} months</td>
                  <td>
                    <span style={{
                      ...styles.status,
                      ...getStatusStyle(challenge.status)
                    }}>
                      {challenge.status}
                    </span>
                  </td>
                  <td>{new Date(challenge.application_deadline).toLocaleDateString()}</td>
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
        You are logged in as <strong>Government</strong>. Create outcome-based challenges to discover innovative solutions from startups.
      </p>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>Total Challenges</h3>
          <p style={styles.statNumber}>{challenges.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Active Challenges</h3>
          <p style={styles.statNumber}>{challenges.filter(c => c.status === 'open').length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Applications</h3>
          <p style={styles.statNumber}>0</p>
        </div>
      </div>
    </div>
  );
}

function CreateChallengeForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: '',
    department: '',
    budget_min: '',
    budget_max: '',
    timeline_months: '',
    application_deadline: '',
    outcome_metrics: '',
    evaluation_criteria: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Challenge created successfully!');
        onSuccess();
      } else {
        alert('Failed to create challenge');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating challenge');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroupFull}>
            <label style={styles.label}>Challenge Title *</label>
            <input
              type="text"
              style={styles.input}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Smart Traffic Management System"
              required
            />
          </div>

          <div style={styles.formGroupFull}>
            <label style={styles.label}>Description *</label>
            <textarea
              style={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the challenge in detail..."
              rows="4"
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
              placeholder="e.g., Smart Cities, Healthcare"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Department *</label>
            <input
              type="text"
              style={styles.input}
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              placeholder="e.g., Transport Department"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Min Budget (₹) *</label>
            <input
              type="number"
              style={styles.input}
              value={formData.budget_min}
              onChange={(e) => setFormData({...formData, budget_min: e.target.value})}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Max Budget (₹) *</label>
            <input
              type="number"
              style={styles.input}
              value={formData.budget_max}
              onChange={(e) => setFormData({...formData, budget_max: e.target.value})}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Timeline (Months) *</label>
            <input
              type="number"
              style={styles.input}
              value={formData.timeline_months}
              onChange={(e) => setFormData({...formData, timeline_months: e.target.value})}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Application Deadline *</label>
            <input
              type="date"
              style={styles.input}
              value={formData.application_deadline}
              onChange={(e) => setFormData({...formData, application_deadline: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={styles.formGroupFull}>
          <label style={styles.label}>Expected Outcomes & Metrics *</label>
          <textarea
            style={styles.textarea}
            value={formData.outcome_metrics}
            onChange={(e) => setFormData({...formData, outcome_metrics: e.target.value})}
            placeholder="What measurable outcomes do you expect?"
            rows="3"
            required
          />
        </div>

        <div style={styles.formGroupFull}>
          <label style={styles.label}>Evaluation Criteria *</label>
          <textarea
            style={styles.textarea}
            value={formData.evaluation_criteria}
            onChange={(e) => setFormData({...formData, evaluation_criteria: e.target.value})}
            placeholder="How will submissions be evaluated?"
            rows="3"
            required
          />
        </div>

        <div style={styles.formActions}>
          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Challenge'}
          </button>
        </div>
      </form>
    </div>
  );
}

const getStatusStyle = (status) => {
  switch(status) {
    case 'open': return { background: '#d4edda', color: '#155724' };
    case 'closed': return { background: '#f8d7da', color: '#721c24' };
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
  formContainer: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
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
  formGroupFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
};

export default GovernmentDashboard;