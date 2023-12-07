import './App.css';
import { useState } from 'react';
import Race from './components/Race';
import Menu from './components/Menu';

function App() {
  const [page, setPage] = useState(''); //default-menu, race,

  const children = ()=> {
    switch (page) {
      case 'race':
        return <Race handleMenuClick={(input:string)=>setPage(input)}/>
      default:
        return <Menu handleMenuClick={(input:string)=>setPage(input)} />
    }
  };
  
  return (
    <div className="App">
      {page==='' && <header className="App-header">
        <span className='App-header-span'>Spell Master</span>
      </header>}
      <main>
        
        {children()}
      </main>
    </div>
  );
}

export default App;
