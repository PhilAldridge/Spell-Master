import './Menu.css'

function Menu({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  return (<>
    <header className="App-header">
        <span className='App-header-span'>Spell Master</span>
    </header>
    <div className='menu'>
      
        <button onClick={()=>handleMenuClick("race")}>Race</button>
        <button onClick={()=>handleMenuClick("crossword")} disabled>Crossword</button>
        <button onClick={()=>handleMenuClick("wordsearch")} disabled>Word Search</button>
        <button onClick={()=>handleMenuClick("wordwall")}>See my word wall</button>
    </div></>
  )
}

export default Menu