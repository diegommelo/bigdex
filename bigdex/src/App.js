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
  const [selectedEditions, setSelectedEditions] = useState([]);

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
        description: 'BBB ' + (index + 1),
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
    setSelectedEditions();
    return () => {};
  }, [selectedEditions]);

  useEffect(() => {
    setFilteredBBBs(filterBBBsByType(selectType));
  }, [selectType]);

  // const allEditions = allBBBs.map((_, index) => {
  //   let edicao = {
  //     id: index,
  //     description: `BBB ${index + 1}`,
  //   };
  //   console.log(edicao);
  //   return edicao;
  // });

  function handleSearchBBB(search) {
    setSearchBBB(search);
  }

  function handleFilterType(type) {
    setSelectType(type);
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
    } else {
      allBBBs.map((edition) => {
        let res = edition.filter((participant) => {
          return participant.tipo.includes(type);
        });
        resp.push(res);
      });
    }
    return resp;
  }

  function filterEditions(index, checked) {
    console.log(filteredBBBs);
    allEditions[index].isChecked = checked;
    allEditions.map((edition) => {
      console.log(edition);
    });
    // let resp = [];
    // allEditions.map((editionChecked) => {
    //   if (editionChecked.isChecked) {
    //     allBBBs.map((edition) => {
    //       let res = edition.filter((participant) => {
    //         return participant.edicao === parseInt(index) + 1;
    //       });
    //       console.log(res);
    //       resp.push(res);
    //     });
    //   }
    // });

    //setFilteredBBBs(resp);
  }

  return (
    <div className="App">
      <Search onSearch={handleSearchBBB} />
      <Types handleFilterByType={handleFilterType} />
      <Editions editions={allEditions} handleSelectEditon={filterEditions} />
      <ListBBBs allBBBs={filteredBBBs} filterByType={handleFilterType} />
    </div>
  );
}
