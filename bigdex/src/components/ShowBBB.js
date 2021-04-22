import React from 'react';
import { parseName, TIPOS } from '../utils/utils';

const URL_FOTO = 'https://paredao.diegomelo.com/img/fotos/';

export default function ShowBBB({ participant }) {
  const { nome, foto, edicao, tipo } = participant;

  return (
    <figure className="bg-gray-100 shadow rounded-xl shadow rounded-xl whitespace-line md:w-44 p-2 min-h-40 m-4">
      <div className="flex flex-row md:space-x-26 space-x-20 mb-2">
        <p className="text-xs md:pl-4 font-semibold">BBB {edicao}</p>
        <p className="text-xs font-semibold">#{foto}</p>
      </div>
      <img
        src={URL_FOTO + foto + '.jpg'}
        className="h-24 w-24 rounded-full mx-auto"
        alt=""
      />
      <div className="py-4">
        <span className="text-center  break-normal">
          {parseName(nome).name}
        </span>
        <br />
        <span className="py-3 text-center  break-normal">
          {nome.split(' ').length > 1 ? parseName(nome).lastName : ''}
        </span>
      </div>
      <div className="mx-auto">
        {tipo.map((type, i) => {
          return (
            <button key={i} className={'text-xs ' + TIPOS[type].color}>
              {type}
            </button>
          );
        })}
      </div>
    </figure>
  );
}
