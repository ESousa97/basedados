'use client';
import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: number;
  titulo: string;
  descricao: string;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 2) {
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
          const data = await response.json();
          if (response.ok) {
            setResults(data);
          } else {
            console.error('Erro ao buscar dados:', data);
            setResults([]);
          }
        } catch (error) {
          console.error('Erro na API:', error);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    };

    // Debounce para a busca
    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div style={{ position: 'fixed', top: '7px', right: '20px', maxWidth: '300px', zIndex: 1001 }}>
      {isExpanded && (
        <input
          type="search"
          name="q"
          placeholder="Buscar..."
          className="px-2 py-1 rounded-lg focus:outline-none text-gray-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
              setIsExpanded(false); // Esconde a caixa de pesquisa quando desfocada
            }, 100);
          }}
          style={{ 
            backgroundColor: 'white',
            width: '100%', // Expande a caixa de pesquisa
            transition: 'width 0.5s ease', // Suaviza a transição da largura
          }}
        />
      )}
      {!isExpanded && (
        <div onClick={() => setIsExpanded(true)} style={{ cursor: 'pointer', padding: '5px', backgroundColor: 'blue', borderRadius: '50%' }}>
          {/* Ícone da lupa */}
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      )}
      {isFocused && results.length > 0 && (
        <ul className="search-results" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          backgroundColor: 'white',
          color: 'black',
          listStyle: 'none',
          padding: '10px',
          margin: 0,
          border: '1px solid #ddd',
          zIndex: 1000,
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          {results.map((item) => (
            <li key={item.id} style={{ cursor: 'pointer', borderBottom: '5px solid #ddd' }}>
              <h4 style={{ margin: '0', fontWeight: 'bold' }}>{item.titulo}</h4>
              <p style={{ margin: '5px 0 0', fontSize: '0.85rem' }}>{item.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
