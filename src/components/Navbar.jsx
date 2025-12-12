import React, { useEffect, useRef, useState } from 'react';

/**
 * Clean Navbar — Only "Features" link is kept
 */
export default function Navbar({
  onSearch = () => {},
  onOpenFeatures = () => {},
  onOpenFavorites = () => {},
  onOpenWOD = () => {},
  theme = 'dark',
  toggleTheme = () => {},
  brand = 'Dictionary React App',
}) {
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);

  /** Search submit */
  function submit(e) {
    e.preventDefault();
    const term = q.trim();
    if (term) {
      onSearch(term);
      setQ('');
      setMobileOpen(false);
    }
  }

  /** Click outside closes mobile menu */
  useEffect(() => {
    function onDocClick(e) {
      if (!mobileOpen) return;
      if (!mobileRef.current) return;
      if (!mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [mobileOpen]);

  /** Keyboard shortcuts */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMobileOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.querySelector('.nav-search input');
        if (input) input.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className="nav" aria-label="Main navigation" ref={mobileRef}>
      {/* LEFT: Branding */}
      <div className="nav-left">
        <button
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-badge">DR</span>
          <div className="brand">
            <div className="brand-title">{brand}</div>
            <div className="brand-sub">Averises • Internship</div>
          </div>
        </button>
      </div>

      {/* CENTER: links + search */}
      <div className={`nav-center ${mobileOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          {/* ONLY FEATURES */}
          <li role="none">
            <a
              role="menuitem"
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                onOpenFeatures();
              }}
            >
              Features
            </a>
          </li>
        </ul>

        {/* Search bar */}
        
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="nav-right">
        <button className="icon-btn" onClick={onOpenWOD} title="Word of the Day">
          🎯
        </button>

        <button
          className="icon-btn"
          onClick={() => toggleTheme()}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button
          className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
          onClick={() => setMobileOpen((p) => !p)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    </nav>
  );
}
