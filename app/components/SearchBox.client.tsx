'use client'
import React, { useState } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data); // Pronto para manipular os dados da resposta
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-end">
      <input
        type="search"
        name="q"
        placeholder="Buscar..."
        className="px-2 py-1 rounded-l-lg focus:outline-none text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ backgroundColor: 'white' }}
      />
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 rounded-r-lg px-4"
      >
        Buscar
      </button>
    </form>
  );
}
