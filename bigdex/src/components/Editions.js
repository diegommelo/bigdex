import React from 'react';

export default function Editions({ editions, onFilterByEdition }) {
  function onSelectEdition(e) {
    //console.log(e.currentTarget.value);
    onFilterByEdition(e.currentTarget.value);
  }

  return (
    <div className="flex flex-wrap place-content-center mt-4 mx-auto">
      <label>
        Filtrar por geração
        <br />
        <select className="mx-auto p-2 mt-2" onChange={onSelectEdition}>
          <option value="todos" value="0">
            Todas as gerações
          </option>
          {editions.map(({ id, description }) => {
            return (
              <option key={id} value={id}>
                {description}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
