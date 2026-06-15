import React, { useState, useEffect } from 'react';
import { notesAPI } from '../services/api';
import NoteCard from './NoteCard';
import '../styles/NoteList.css';

function NoteList({ refreshTrigger, onEditNote, onDeleteSuccess }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await notesAPI.getAllNotes();
      if (response.success) {
        setNotes(response.notes || []);
      } else {
        setError(response.message || 'Failed to fetch notes');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await notesAPI.deleteNote(noteId);
        if (response.success) {
          // Remove from local state
          setNotes(notes.filter(note => note.id !== noteId));
          // Call success callback to trigger redirect
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        } else {
          setError(response.message || 'Failed to delete note');
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <div className="note-list-container">
      {error && <div className="error-message">{error}</div>}

      {notes.length === 0 ? (
        <div className="empty-state">
          <p>📭 No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="note-list">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEditNote}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;
