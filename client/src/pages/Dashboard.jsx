import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm.jsx';
import NoteList from '../components/NoteList.jsx';
import Header from '../components/Header.jsx';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = (type = 'create') => {
    setShowForm(false);
    setSelectedNote(null);
    // Redirect to success page with operation type
    navigate('/success', { state: { type } });
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedNote(null);
  };

  const handleDeleteSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    navigate('/success', { state: { type: 'delete' } });
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="sidebar">
            <button
              className="btn-new-note"
              onClick={() => {
                setSelectedNote(null);
                setShowForm(!showForm);
              }}
            >
              {showForm ? '❌ Close' : '✨ New Note'}
            </button>
          </div>

          <div className="main-content">
            {showForm && (
              <div className="form-section">
                <h2>{selectedNote ? 'Edit Note' : 'Create New Note'}</h2>
                <NoteForm
                  note={selectedNote}
                  onSuccess={() => handleSuccess(selectedNote ? 'update' : 'create')}
                  onCancel={handleCancel}
                />
              </div>
            )}

            <div className="notes-section">
              <h2>Your Notes</h2>
              <NoteList
                refreshTrigger={refreshTrigger}
                onEditNote={handleEditNote}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
