import { useState, useEffect } from 'react';
import { stripAccentuation } from './utils/utils';
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
        isChecked: true,
      }));
      setAllEditions(editionsArray);
    }
    getAllBBBs();
  }, []);

  useEffect(() => {
    setFilteredBBBs(bbbSearch(searchBBB));
  }, [searchBBB]);

  useEffect(() => {
    setFilteredBBBs(filterBBBsByType(selectType));
  }, [selectType]);

  useEffect(() => {
    setFilteredBBBs(filterByEdition(selectedEdition));
  }, [selectedEdition]);

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
      resp.push(res);
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
      resp.push(res);
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
      resp.push(res);
    });
    return resp;
  }

  return (
    <div className="App">
      <img
        src="/logo.png"
        alt="BigDex Brasil"
        className="mx-auto md:w-1/12 w-1/4 m-2"
      />
      <h1 className="font-semibold text-4xl m-4">BigDex Brasil</h1>
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
      <ListBBBs
        allEditions={allEditions}
        allBBBs={filteredBBBs}
        filterByType={handleFilterType}
      />
      ;
    </div>
  );
}
