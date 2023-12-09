import './App.css';
import { useState } from 'react';
import Race from './components/Race';
import Menu from './components/Menu';
import WordWall from './components/WordWall';
import WordSearch from './components/WordSearch';
import TrickyWords from './components/TrickyWords';

function App() {
  const [page, setPage] = useState('menu'); //default-menu, race, etc.

  const children = ()=> {
    switch (page) {
      case 'race':
        return <Race handleMenuClick={(input:string)=>setPage(input)}/>
      case "wordwall":
        return <WordWall handleMenuClick={(input:string)=>setPage(input)}/>
      case 'wordsearch':
        return <WordSearch handleMenuClick={(input:string)=>setPage(input)}/>
      case 'trickywords':
        return <TrickyWords handleMenuClick={(input:string)=>setPage(input)}/>
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
