import Cookies from "universal-cookie"
import { words } from './words/words';
import { ReactElement } from "react";
import HomeButton from "./HomeButton";
import './WordWall.css'
const colors = ['#FF0000','#FF2000','#FF4000','#FF6000','#FF8000','#FF9F00','#FFBF00','#FFDF00','#FFFF00','#DFFF00','#BFFF00','#9FFF00','#80FF00','#60FF00','#40FF00','#20FF00','#00FF00']

function WordWall({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
    const cookies = new Cookies(null, { path:'/'});
    const scores = cookies.getAll();
    console.log(scores)
    let children: ReactElement[] = [];
    words.forEach(word=> {
        const score = scores[word.word+'correct']? (scores[word.word+'correct']/(scores[word.word+'correct']+scores[word.word+'incorrect'])) : 0;
        children.push(<div style={{background:colors[Math.floor(score*colors.length)]}}>{word.word}</div>)
    })

  return (<>
    <header className="App-header">
        <span className='App-header-span'>Spell Master</span>
      </header>
    <div className="wordWall-container"><div className="wordwall">
        
        {children}
    </div></div>
        <HomeButton handleMenuClick={handleMenuClick} />
    </>
  )
}

export default WordWall