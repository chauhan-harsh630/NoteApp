import React, { useState, useEffect } from 'react';
import { notesAPI } from '../services/api';
import '../styles/NoteForm.css';

function NoteForm({ note = null, onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setIsPinned(note.is_pinned || false);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (note) {
        // Update existing note
        response = await notesAPI.updateNote(note.id, title, content, isPinned);
      } else {
        // Create new note
        response = await notesAPI.createNote(title, content, isPinned);
      }

      if (response.success) {
        setTitle('');
        setContent('');
        setIsPinned(false);
        onSuccess();
      } else {
        setError(response.message || 'Failed to save note');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
          rows="6"
          required
        />
      </div>

      <div className="form-group checkbox">
        <label htmlFor="isPinned">
          <input
            id="isPinned"
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
          Pin this note
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
