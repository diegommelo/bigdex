import { useState, useEffect } from 'react';
import './App.css';
import ListBBBs from './components/ListBBBs';
import Search from './components/Search';

const URL_API = 'http://localhost:3000/participantes';

export default function App() {
  const [allBBBs, setAllBBBs] = useState([]);
  const [filteredBBBs, setFilteredBBBs] = useState([]);
  // const [selectedBBB, setSelectedBBB] = useState(0);
  // const [selectedBrother, setSelectedBrother] = useState(0);
  const [searchBBB, setSearchBBB] = useState('');

  useEffect(() => {
    async function getAllBBBs() {
      const res = await fetch(URL_API);
      const data = await res.json();
      setAllBBBs(data);
      setFilteredBBBs(data);
    }
    getAllBBBs();
  }, []);

  useEffect(() => {
    setFilteredBBBs(bbbSearch(searchBBB));
  }, [searchBBB]);

  const allEditions = allBBBs.map((_, index) => {
    let edicao = {
      id: index,
      description: `BBB ${index + 1}`,
    };
    return edicao;
  });

  function onSearchBBB(search) {
    setSearchBBB(search);
  }

  function bbbSearch(search) {
    let resp = [];
    allBBBs.map((edition) => {
      let res = edition.filter((participant) => {
        return participant.nome.toLowerCase().includes(search.toLowerCase());
      });
      resp.push(res);
    });
    return resp;
  }

  return (
    <div className="App">
      <Search onSearch={onSearchBBB} />
      <ListBBBs allEditions={allEditions} allBBBs={filteredBBBs} />;
    </div>
  );
}
