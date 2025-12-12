import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q);
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search English word..."
        aria-label="Search word"
      />
      <div className="actions">
        <button type="submit" className="btn">Search</button>
        <button type="button" className="btn alt" onClick={() => { setQ(''); if (onSearch) onSearch(''); }}>Clear</button>
      </div>
    </form>
  );
}
