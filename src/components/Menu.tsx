import './Menu.css'

function Menu({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  return (<>
    <header className="App-header">
        <span className='App-header-span'>Spell Master</span>
    </header>
    <div className='menu'>
        <button onClick={()=>handleMenuClick("countdown")}>Race</button>
        <button onClick={()=>handleMenuClick("crossword")} disabled>Crossword</button>
        <button onClick={()=>handleMenuClick("wordsearch")}>Word Search</button>
        <button onClick={()=>handleMenuClick("trickywords")}>Tricky words</button>
        <button onClick={()=>handleMenuClick("wordwall")}>My profile</button>
    </div></>
  )
}

export default Menu