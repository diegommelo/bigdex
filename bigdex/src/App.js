import { useState, useEffect } from 'react';
import { stripAccentuation, TIPOS } from './utils/utils';
import './App.css';
import ListBBBs from './components/ListBBBs';
import Search from './components/Search';
import Types from './components/Types';
import Editions from './components/Editions';

const URL_API = 'http://localhost:3000/participantes';

export default function App() {
  const [allBBBs, setAllBBBs] = useState([]);
  const [filteredBBBs, setFilteredBBBs] = useState([]);
  // const [selectedBBB, setSelectedBBB] = useState(0);
  // const [selectedBrother, setSelectedBrother] = useState(0);
  const [searchBBB, setSearchBBB] = useState('');
  const [selectType, setSelectType] = useState('');
  const [allEditions, setAllEditions] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [filteredBy, setFilteredBy] = useState('');
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    async function getAllBBBs() {
      const res = await fetch(URL_API);
      const data = await res.json();
      setAllBBBs(data);
      setFilteredBBBs(data);
      let editionsArray = await Array.from({
        length: data.length,
      }).map((_, index) => ({
        id: index + 1,
        description: index + 1 + 'ª geração',
      }));
      setAllEditions(editionsArray);
    }
    getAllBBBs();
  }, []);

  useEffect(() => {
    setFilteredBBBs(bbbSearch(searchBBB));
    setFilteredBy({ filter: 'name', value: 'Nome' });
  }, [searchBBB]);

  useEffect(() => {
    setFilteredBBBs(filterBBBsByType(selectType));
    setFilteredBy({ filter: 'type', value: selectType });
  }, [selectType]);

  useEffect(() => {
    setFilteredBBBs(filterByEdition(selectedEdition));
    setFilteredBy({ filter: 'edition', value: selectedEdition });
  }, [selectedEdition]);

  useEffect(() => {
    const onScroll = e => {
      document.documentElement.scrollTop > 150 ? setScrollTop(true) : setScrollTop(false)
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [scrollTop])

  function handleSearchBBB(search) {
    setSearchBBB(search);
  }

  function handleFilterType(type) {
    setSelectType(type);
  }

  function handleFilterByEdition(edition) {
    setSelectedEdition(edition);
  }

  function handleShowFilters() {
    setShowFilters(!showFilters);
  }

  function bbbSearch(search) {
    let resp = [];
    allBBBs.map((edition) => {
      let res = edition.filter((participant) => {
        let striped = stripAccentuation(participant.nome.toLowerCase());
        return striped.includes(search.toLowerCase());
      });
      return resp.push(res);
    });
    return resp;
  }

  function filterBBBsByType(type) {
    let resp = [];
    if (type === 'todos') {
      resp = [...allBBBs];
    }
    allBBBs.map((edition) => {
      let res = edition.filter((participant) => {
        return participant.tipo.includes(type);
      });
      return resp.push(res);
    });
    return resp;
  }

  function filterByEdition(editionSelected) {
    let resp = [];
    if (parseInt(editionSelected) === 0) {
      resp = [...allBBBs];
    }
    allBBBs.map((edition) => {
      let res = edition.filter((participant) => {
        return participant.edicao === parseInt(editionSelected);
      });
      return resp.push(res);
    });
    return resp;
  }

  function scrollToTop(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  return (
    <div className="App">
      <img
        src="/logo.png"
        alt="BigDex Brasil"
        className="mx-auto md:w-1/12 w-1/4 m-2"
      />
      <h1 className="font-semibold text-4xl m-4">BigDex Brasil</h1>
      <p className="text-sm text-center pb-4">por <a href="https://twitter.com/dieguitoo">@dieguitoo</a> e <a href="https://twitter.com/paulinha_v">@paulinha_v</a></p>
      <Search onSearch={handleSearchBBB} />
      <button className="mt-4" onClick={handleShowFilters}>
        <span className={showFilters ? 'hidden' : ''}>
          Exibir filtros &#9662;
        </span>
        <span className={showFilters ? '' : 'hidden'}>
          Esconder filtros &#9652;
        </span>
      </button>
      <div className={showFilters ? '' : 'hidden'}>
        <Types handleFilterByType={handleFilterType} />
        <Editions
          editions={allEditions}
          onFilterByEdition={handleFilterByEdition}
        />
      </div>
      <div>
        <p className="text-left w-9/12 mx-auto md:pl-12 mt-6" id="filtrado">
          Filtrado por: &nbsp;
          {filteredBy.filter === 'type' && (
            <button
              className={
                'text-xs inline-block rounded-full text-white duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100 ' +
                TIPOS[filteredBy.value].color
              }
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
      <ListBBBs
        allEditions={allEditions}
        allBBBs={filteredBBBs}
        filterByType={handleFilterType}
      />
      <div>
        <button className={`${scrollTop ? 'visible' : 'invisible'} md:invisible bottom-5 shadow-md right-10 fixed rounded-full text-black bg-gray-200 w-12 h-12`} onClick={scrollToTop}>&#8593;</button>
      </div>
    </div>
  );
}
