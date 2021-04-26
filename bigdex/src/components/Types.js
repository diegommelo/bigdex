import React from 'react';
import { TIPOS } from '../utils/utils';

export default function Types({ handleFilterByType }) {
  function onFilterByType(e) {
    handleFilterByType(e.currentTarget.value);
  }

  return (
    <div className="flex flex-wrap place-content-center mt-6 mx-auto w-2/3 md:w-full ">
      <label>
        Filtrar por tipo <br />
        <div className="mt-2">
          {Object.entries(TIPOS).map((tipo, i) => {
            return (
              <button
                key={i}
                className={
                  'text-xs inline-block rounded-full text-white duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-75 hover:opacity-100 focus:opacity-100 active:opacity-100 ' +
                  tipo[1].color
                }
                onClick={onFilterByType}
                value={tipo[0]}
              >
                {tipo[0]}
              </button>
            );
          })}
        </div>
      </label>
    </div>
  );
}
