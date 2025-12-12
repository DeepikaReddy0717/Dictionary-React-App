import React from 'react';

export default function Favorites({ favorites = [], onOpen, onRemove }) {
  return (
    <div className="favorites">
      <h4>Favorites</h4>
      {favorites.length === 0 ? (
        <div className="small muted">No favorites yet — add a word to favorite it.</div>
      ) : (
        <ul>
          {favorites.map(f => (
            <li key={f.word} className="fav-item">
              <button className="link" onClick={() => onOpen(f.word)}>{f.word}</button>
              <div className="fav-actions">
                <button className="small" onClick={() => onOpen(f.word)}>Open</button>
                <button className="small danger" onClick={() => onRemove(f.word)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
