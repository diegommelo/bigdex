export const TIPOS = {
  planta: {
    name: 'planta',
    color:
      'inline-block rounded-full text-white bg-green-400 hover:bg-green-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  fogo: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-red-600 hover:bg-red-700 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  fantasma: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-grey-400 hover:bg-grey-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  normal: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-gray-600 hover:bg-gray-700 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  fada: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-pink-400 hover:bg-pink-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  sombrio: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-red-400 hover:bg-red-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  venenoso: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-green-600 hover:bg-green-700 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
  lutador: {
    name: 'fogo',
    color:
      'inline-block rounded-full text-white bg-red-400 hover:bg-red-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
  },
};

export function parseName(input) {
  var fullName = input || '';
  var result = {};

  if (fullName.length > 0) {
    var nameTokens =
      fullName.match(
        /[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g
      ) || [];

    if (nameTokens.length > 3) {
      result.name = nameTokens.slice(0, 2).join(' ');
    } else {
      result.name = nameTokens.slice(0, 1).join(' ');
    }

    if (nameTokens.length > 2) {
      result.lastName = nameTokens.slice(-2, -1).join(' ');
      result.secondLastName = nameTokens[1];
    } else {
      result.lastName = nameTokens.slice(-1).join(' ');
      result.secondLastName = '';
    }
  }

  return result;
}
