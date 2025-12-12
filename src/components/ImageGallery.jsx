import React, { useEffect, useState } from 'react';

export default function ImageGallery({ word }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!word) {
      setImages([]);
      return;
    }
    const key = import.meta.env.VITE_PEXELS_API_KEY;
    if (!key) {
      setImages([]);
      return;
    }
    let cancelled = false;
    async function fetchImages() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(word)}&per_page=6`, {
          headers: { Authorization: key }
        });
        if (!res.ok) {
          setImages([]);
          return;
        }
        const json = await res.json();
        if (!cancelled) setImages(json.photos || []);
      } catch (e) {
        console.warn('Pexels fetch failed', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchImages();
    return () => { cancelled = true; };
  }, [word]);

  if (!word) return <div className="images-placeholder">Search a word to see images </div>;

  if (!import.meta.env.VITE_PEXELS_API_KEY) {
    return <div className="images-placeholder">No Pexels API key found. Add VITE_PEXELS_API_KEY to .env to enable images.</div>;
  }

  return (
    <div className="image-gallery">
      <h4>Images for "{word}"</h4>
      {loading && <div className="status">Loading images...</div>}
      <div className="grid">
        {images.map(img => (
          <a key={img.id} href={img.src.original} target="_blank" rel="noreferrer" className="img-card">
            <img src={img.src.medium} alt={img.alt || word} loading="lazy" />
            <div className="img-meta">{img.photographer}</div>
          </a>
        ))}
      </div>
      {!loading && images.length === 0 && <div className="status">No images found.</div>}
    </div>
  );
}
