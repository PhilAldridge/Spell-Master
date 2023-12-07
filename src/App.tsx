import './App.css';
import { useState } from 'react';
import Race from './components/Race';
import Menu from './components/Menu';
import WordWall from './components/WordWall'
function App() {
  const [page, setPage] = useState(''); //default-menu, race,

  const children = ()=> {
    switch (page) {
      case 'race':
        return <Race handleMenuClick={(input:string)=>setPage(input)}/>
      case "wordwall":
        return <WordWall handleMenuClick={(input:string)=>setPage(input)}/>
      default:
        return <Menu handleMenuClick={(input:string)=>setPage(input)} />
    }
  };
  
  return (
    <div className="App">
      <main>
        
        {children()}
      </main>
    </div>
  );
}

export default App;
