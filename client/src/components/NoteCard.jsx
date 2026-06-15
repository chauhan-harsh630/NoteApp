import React from 'react';
import '../styles/NoteCard.css';

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`note-card ${note.is_pinned ? 'pinned' : ''}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        {note.is_pinned && <span className="pin-icon">📌</span>}
      </div>

      <p className="note-content">{note.content.substring(0, 100)}...</p>

      <div className="note-footer">
        <span className="note-date">{formatDate(note.created_at)}</span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn-edit" title="Edit">
            ✏️
          </button>
          <button onClick={() => onDelete(note.id)} className="btn-delete" title="Delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
