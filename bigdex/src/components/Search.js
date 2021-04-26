import React from 'react';

export default function Search({ onSearch }) {
  function handleChange(e) {
    onSearch(e.target.value);
  }

  function handleClick(e){
    e.target.select();
  }

  return (
    <div>
      <input
        className="w-2/3 md:w-1/2 p-4 mt-4"
        type="search"
        placeholder="Pesquisar BBB (sem acentos)"
        onChange={handleChange}
        onClick={handleClick}
      ></input>
    </div>
  );
}
