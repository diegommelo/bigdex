import { useState, useEffect } from 'react';
import './App.css';
import ListBBBs from './components/ListBBBs';

const URL_API = 'http://localhost:3000/participantes';

export default function App() {
  const [allBBBs, setAllBBBs] = useState([]);
  const [selectedBBB, setSelectedBBB] = useState(0);
  const [selectedBrother, setSelectedBrother] = useState(0);

  useEffect(() => {
    async function getAllBBBs() {
      const res = await fetch(URL_API);
      const data = await res.json();
      setAllBBBs(data);
    }
    getAllBBBs();
  }, []);

  const allEditions = allBBBs.map((_, index) => {
    let edicao = {
      id: index,
      description: `BBB ${index + 1}`,
    };
    return edicao;
  });

  return (
    <div className="App">
      <ListBBBs allEditions={allEditions} allBBBs={allBBBs} />;
    </div>
  );
}
