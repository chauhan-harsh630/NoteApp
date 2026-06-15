import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Success.css';

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type || 'create';

  useEffect(() => {
    // Auto-redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const messages = {
    create: {
      title: '✨ Note Created Successfully!',
      subtitle: 'Your note has been saved.'
    },
    update: {
      title: '✏️ Note Updated Successfully!',
      subtitle: 'Your changes have been saved.'
    },
    delete: {
      title: '🗑️ Note Deleted Successfully!',
      subtitle: 'Your note has been removed.'
    }
  };

  const current = messages[type] || messages.create;

  return (
    <div className="success-container">
      <div className="success-box">
        <h1 className="success-title">{current.title}</h1>
        <p className="success-subtitle">{current.subtitle}</p>
        <p className="success-redirect">Redirecting to dashboard in 2 seconds...</p>
        <button
          className="success-btn"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
}

export default Success;
