import React from 'react';
import clsx from 'clsx';

export default function DarkToggle({ theme, setTheme }) {
  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  return (
    <button className={clsx('toggle', theme === 'dark' && 'on')} onClick={toggle}>
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
