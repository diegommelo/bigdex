import React from 'react';
import { parseName, TIPOS } from '../utils/utils';

const URL_FOTO = 'https://paredao.diegomelo.com/img/fotos/';

export default function ShowBBB({ participant, handleFilterByType, scrollToTop }) {
  const { nome, foto, edicao, tipo, campeao } = participant;

  function onFilterByType(e) {
    handleFilterByType(e.currentTarget.value);
    document.querySelector('#filtrado').scrollIntoView()
  }
  return (
    <figure
      className={`bg-gray-100 shadow rounded-xl shadow rounded-xl whitespace-line md:w-44 w-38 p-2 min-h-40 md:m-4 m-2 ${
        campeao ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      <div className="flex flex-row md:space-x-26 space-x-16 mb-2">
        <p className="text-xs md:pl-4 font-semibold">BBB {edicao}</p>
        <p className="text-xs font-semibold">#{foto}</p>
      </div>
      <div className="relative flex">
        <img
          src={URL_FOTO + foto + '.jpg'}
          className="h-24 w-24 rounded-full mx-auto"
          alt=""
        />
        <div
          className={`bottom-0 right-10 absolute rounded-full w-5 h-5 bg-white inline-block flex justify-center items-center ${
            campeao ? 'visible' : 'invisible'
          }`}
        >
          <span href="#" className="inline-block">
            👑
          </span>
        </div>
      </div>

      <div className="py-4">
        <span className="text-center break-normal">{parseName(nome).name}</span>
        <br />
        <span className="py-3 text-center break-normal">
          {nome.split(' ').length > 1 ? parseName(nome).lastName : ''}
        </span>
      </div>
      <div className="mx-auto">
        {tipo.map((type, i) => {
          return (
            <button
              key={i}
              className={
                'text-xs inline-block rounded-full text-white duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100 ' +
                TIPOS[type].color
              }
              onClick={onFilterByType}
              value={type}
            >
              {type}
            </button>
          );
        })}
      </div>
    </figure>
  );
}
