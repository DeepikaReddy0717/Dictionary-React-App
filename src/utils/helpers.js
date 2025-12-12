// small helper utilities

export function speakWord(text) {
  if (!text) return;
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'en-US';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(uttr);
}

// simple localStorage helpers
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { console.warn(e); }
}

export function loadFromStorage(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch (e) { return null; }
}

// word of the day pool
const WOD = [
  'aberration','serendipity','eloquent','ubiquitous','ephemeral',
  'sonder','lucid','nefarious','resilient','gregarious'
];

export function getRandomWordOfDay() {
  return WOD[Math.floor(Math.random() * WOD.length)];
}
