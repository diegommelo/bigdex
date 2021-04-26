export const TIPOS = {
  todos: {
    name: 'todos',
    color: 'bg-indigo-400 hover:bg-indigo-400',
  },
  planta: {
    name: 'planta',
    color: 'bg-green-400 hover:bg-green-500',
  },
  fogo: {
    name: 'fogo',
    color: 'bg-red-600 hover:bg-red-700',
  },
  fantasma: {
    name: 'fantasma',
    color: 'bg-gray-400 hover:bg-gray-500',
  },
  normal: {
    name: 'normal',
    color: 'bg-gray-600 hover:bg-gray-700',
  },
  fada: {
    name: 'fada',
    color: 'bg-pink-400 hover:bg-pink-500',
  },
  sombrio: {
    name: 'sombrio',
    color: 'bg-gray-800 hover:bg-gray-900',
  },
  venenoso: {
    name: 'venenoso',
    color: 'bg-green-600 hover:bg-green-700',
  },
  lutador: {
    name: 'lutador',
    color: 'bg-red-400 hover:bg-red-500',
  },
  arcrebiano: {
    name: 'arcrebiano',
    color: 'bg-yellow-700 hover:bg-yellow-800',
  },
  psiquico: {
    name: 'psisquico',
    color: 'bg-purple-400 hover:bg-purple-500',
  },
  eletrico: {
    name: 'psisquico',
    color: 'bg-yellow-400 hover:bg-yellow-500',
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
/**
 * Remove acentos de caracteres (github.com/marioluan)
 * @param  {String} stringComAcento [string que contem os acentos]
 * @return {String}                 [string sem acentos]
 */
export function stripAccentuation(newStringComAcento) {
  var string = newStringComAcento;
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }

  return string;
}
