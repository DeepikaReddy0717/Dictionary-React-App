import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import ImageGallery from './components/ImageGallery';
import Favorites from './components/Favorites';
import DarkToggle from './components/DarkToggle';
import { fetchDictionary } from './services/api';
import { getRandomWordOfDay, loadFromStorage, saveToStorage } from './utils/helpers';

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(loadFromStorage('favorites') || []);
  const [theme, setTheme] = useState(loadFromStorage('theme') || 'light');
  const [wordOfDay, setWordOfDay] = useState(getRandomWordOfDay());
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage('theme', theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage('favorites', favorites);
  }, [favorites]);

  async function handleSearch(q) {
    if (!q || !q.trim()) return;
    setQuery(q.trim());
    setLoading(true);
    setError('');
    setData(null);
    setImages([]);

    try {
      const dict = await fetchDictionary(q.trim());
      setData(dict);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch word');
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(wordObj) {
    const exists = favorites.find(f => f.word === wordObj.word);
    if (exists) {
      setFavorites(prev => prev.filter(f => f.word !== wordObj.word));
    } else {
      setFavorites(prev => [{ ...wordObj, addedAt: Date.now() }, ...prev]);
    }
  }

  function handleOpenFavorites() {
    const el = document.getElementById('favorites-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.animate(
        [{ boxShadow: '0 0 0px rgba(37,99,235,0)' }, { boxShadow: '0 8px 28px rgba(37,99,235,0.12)' }, { boxShadow: '0 0 0px rgba(37,99,235,0)' }],
        { duration: 1200, easing: 'ease' }
      );
    } else {
      console.warn('Favorites panel not mounted yet.');
    }
  }

  function handleToggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="app">
      <Navbar
        theme={theme}
        toggleTheme={handleToggleTheme}
        onSearch={handleSearch}
        onOpenFavorites={handleOpenFavorites}
        onOpenWOD={() => handleSearch(wordOfDay)}
        onOpenFeatures={() => setShowFeatures(true)}
        brand="Dictionary React App"
        favoritesCount={favorites.length}
      />

      

      <main className="main">
        <section className="left">
          <SearchBar onSearch={handleSearch} />
          {loading && <div className="status">Loading...</div>}
          {error && <div className="status error">{error}</div>}

          {data && (
            <WordDetails
              word={query}
              data={data}
              onToggleFavorite={() =>
                toggleFavorite({
                  word: query,
                  snippet: data[0]?.meanings?.[0]?.definitions?.[0]?.definition || ''
                })
              }
              isFavorite={!!favorites.find(f => f.word === query)}
            />
          )}

          {!data && !loading && !error && (
            <>
              <div className="hint">
                Try words:
                <button className="chip" onClick={() => handleSearch('aberration')}>aberration</button>
                <button className="chip" onClick={() => handleSearch('serendipity')}>serendipity</button>
              </div>

              <div className="wod" style={{ marginTop: 16 }}>
                <h3>Word of the Day</h3>
                <div className="wod-card" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                  <strong>{wordOfDay}</strong>
                  <button onClick={() => handleSearch(wordOfDay)} className="small">View</button>
                  <button onClick={() => setWordOfDay(getRandomWordOfDay())} className="small">New</button>
                </div>
              </div>
            </>
          )}
        </section>

        <aside className="right">
          <div id="favorites-panel">
            <Favorites
              favorites={favorites}
              onOpen={handleSearch}
              onRemove={(w) => setFavorites(prev => prev.filter(f => f.word !== w))}
            />
          </div>

          <ImageGallery word={query} />
        </aside>
      </main>

      {/* FEATURES MODAL */}
      {showFeatures && (
        <div className="modal-backdrop" onClick={() => setShowFeatures(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="App features"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <h2 style={{ margin: 0 }}>✨ App Features</h2>
              <button className="btn small" onClick={() => setShowFeatures(false)} aria-label="Close features">
                Close
              </button>
            </div>

            <ul className="feature-list" style={{ marginTop: 12 }}>
              <li>🔍 Search English words (Free Dictionary API)</li>
              <li>📚 Definitions, parts of speech, example sentences</li>
              <li>🗣 Pronunciation (audio) & phonetics</li>
              <li>🖼 Images from Pexels </li>
              <li>⭐ Favorites stored in localStorage</li>
              <li>🎯 Word of the Day</li>
              <li>🌙 Dark / Light theme</li>
              <li>📱 Responsive UI and accessible keyboard controls</li>
            </ul>
          </div>
        </div>
      )}

      <footer className="footer" style={{ marginTop: 18 }}>
        <small>Dictionary React App — Internship Project | © 2025 @Deepika Reddy | Averises Solution Pvt. Ltd.</small>
      </footer>
    </div>
  );
}
