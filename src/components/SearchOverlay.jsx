import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import { JOURNAL_ITEMS } from '../data/journal';
import './SearchOverlay.css';

function buildSrc(product) {
  return `https:${product.imageBase}600x${product.imageExt}${
    product.v ? `?v=${product.v}` : ''
  }`;
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter((p) => p.title.toLowerCase().includes(trimmed))
    : [];

  return (
    <div className="SearchOverlay">
      <div className="SearchOverlay__Bar">
        <input
          ref={inputRef}
          type="text"
          className="SearchOverlay__Input Heading"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="SearchOverlay__Close" aria-label="Close search" onClick={onClose}>
          <svg viewBox="0 0 16 14">
            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" />
          </svg>
        </button>
      </div>

      {trimmed && (
        <div className="SearchOverlay__Body">
          <div className="SearchOverlay__Main">
            <div className="SearchOverlay__Meta">
              <span className="Text--subdued u-h7">{results.length} RESULTS</span>
              <Link
                to={`/search?q=${encodeURIComponent(query)}`}
                className="Link Link--secondary u-h7"
                onClick={onClose}
              >
                View All
              </Link>
            </div>

            {results.length > 0 ? (
              <div className="SearchOverlay__Grid">
                {results.slice(0, 4).map((product) => (
                  <Link to="#" className="SearchOverlay__Item" key={product.handle} onClick={onClose}>
                    <div className="SearchOverlay__ItemImage">
                      <img src={buildSrc(product)} alt={product.title} />
                    </div>
                    <p className="Heading u-h7">{product.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="Text--subdued">No results found.</p>
            )}
          </div>

          <div className="SearchOverlay__Journal">
            <div className="SearchOverlay__Meta">
              <span className="Heading u-h7">Journal</span>
              <a href="#" className="Link Link--secondary u-h7">
                View All
              </a>
            </div>
            <ul className="SearchOverlay__JournalList">
              {JOURNAL_ITEMS.map((title) => (
                <li key={title}>
                  <a href="#">{title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchOverlay;
