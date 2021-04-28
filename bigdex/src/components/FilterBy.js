import React from 'react';
import {TIPOS} from '../utils/utils';

export default function FilterBy({filteredBy, handleFilterByType}) {

  function resetFilter(){
    handleFilterByType('todos')
  }

  return (
    <div>
      <p className="text-left w-9/12 mx-auto md:pl-12 mt-6" id="filtrado">
        Filtrado por: &nbsp;
        {filteredBy.filter === 'type' && (
          <button
            className={
              'text-xs inline-block rounded-full text-white duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100 ' +
              TIPOS[filteredBy.value].color
            }
            onClick={resetFilter}
          >
            {filteredBy.value}
          </button>
        )}
        <span className={filteredBy.filter === 'edition' ? '' : 'hidden'}>
          {filteredBy.filter === 'edition' && parseInt(filteredBy.value) !== 0
            ? filteredBy.value + 'ª geração'
            : 'Todas as gerações'}
        </span>
        <span className={filteredBy.filter === 'name' ? '' : 'hidden'}>
          {filteredBy.filter === 'name' && filteredBy.value}
        </span>
      </p>
    </div>
  )
}
