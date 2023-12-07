import './Menu.css'

function Menu({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  return (
    <div className='menu'>
        <button onClick={()=>handleMenuClick("race")}>Race</button>
        <button onClick={()=>handleMenuClick("crossword")} disabled>Crossword</button>
        <button onClick={()=>handleMenuClick("wordsearch")} disabled>Word Search</button>
        <button onClick={()=>handleMenuClick("wordlist")}>See my word wall</button>
    </div>
  )
}

export default Menu