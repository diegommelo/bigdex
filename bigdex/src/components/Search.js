import React from 'react';

export default function Search({ onSearch }) {
  function handleChange(e) {
    onSearch(e.target.value);
  }

  return (
    <div>
      <input
        className="w-9/12 p-4 mt-4"
        type="search"
        placeholder="Pesquisar BBB (sem acentos)"
        onChange={handleChange}
      ></input>
    </div>
  );
}
