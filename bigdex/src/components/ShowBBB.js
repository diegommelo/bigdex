import React from 'react';
import { parseName } from '../utils/utils';

const URL_FOTO = 'https://paredao.diegomelo.com/img/fotos/';

export default function ShowBBB({ participant }) {
  const { nome, foto, edicao } = participant;

  return (
    <figure className="bg-gray-100 shadow rounded-xl 'shadow rounded-xl whitespace-line box-border content-center m-4 p-4 w-36 min-h-48 ' + m-4 p-4 X w-36 min-h-36 whitespace-line">
      <p className="text-right text-xs">#{foto}</p>
      <img src={URL_FOTO + foto + '.jpg'} className="h-24 w-24 rounded-full" />
      <div className="py-2">
        <span className="text-sm text-center font-semibold break-normal">
          {parseName(nome).name}
        </span>
        <br />
        <span className="text-sm py-3 text-center font-semibold break-normal">
          {nome.split(' ').length > 1 ? parseName(nome).lastName : ''}
        </span>
      </div>
      <p class="text-xs py-2">BBB {edicao}</p>
    </figure>
  );
}

const styles = {
  bbb1: 'bg-gradient-to-b from-green-300 via-blue-500 to-purple-600',
};
