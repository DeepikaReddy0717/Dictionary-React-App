import React from 'react';
import { speakWord } from '../utils/helpers';

export default function WordDetails({ word, data, onToggleFavorite, isFavorite }) {
  // data is array returned by API
  const entry = data?.[0];
  if (!entry) return null;

  const phoneticAudio = entry?.phonetics?.find(p => p.audio)?.audio || null;
  const meanings = entry.meanings || [];

  return (
    <section className="word-details">
      <div className="word-header">
        <div>
          <h2>{entry.word} <span className="phonetic">{entry.phonetic || ''}</span></h2>
          <div className="meta">
            <small>{entry.origin || ''}</small>
          </div>
        </div>

        <div className="word-actions">
          <button onClick={() => phoneticAudio ? new Audio(phoneticAudio).play().catch(()=>speakWord(entry.word)) : speakWord(entry.word)} className="btn small">🔊 Pronounce</button>
          <button onClick={onToggleFavorite} className={`btn small ${isFavorite ? 'fav' : ''}`}>{isFavorite ? '★ Favorited' : '☆ Add Favorite'}</button>
        </div>
      </div>

      <div className="meanings">
        {meanings.map((m, idx) => (
          <div key={idx} className="meaning">
            <h4>{m.partOfSpeech}</h4>
            {m.definitions?.map((d, i) => (
              <div key={i} className="definition">
                <p className="def">{d.definition}</p>
                {d.example && <p className="example">“{d.example}”</p>}
                {d.synonyms && d.synonyms.length > 0 && <p className="meta">Synonyms: {d.synonyms.join(', ')}</p>}
                {d.antonyms && d.antonyms.length > 0 && <p className="meta">Antonyms: {d.antonyms.join(', ')}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
