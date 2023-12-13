import Cookies from "universal-cookie"
import {wordString} from './words/words2';
import { ReactElement } from "react";
import HomeButton from "./HomeButton";
import './WordWall.css'
import Profile from './Profile'
const colors = ['#FF0000','#FF2000','#FF4000','#FF6000','#FF8000','#FF9F00','#FFBF00','#FFDF00','#FFFF00','#DFFF00','#BFFF00','#9FFF00','#80FF00','#60FF00','#40FF00','#20FF00','#00FF00']
const words = wordString.split('\n');

function WordWall({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
    const cookies = new Cookies(null, { path:'/'});
    const scores = cookies.getAll();
    console.log(scores)
    let children: ReactElement[] = [];
    let total = 0;
    words.forEach(word=> {
        let score = scores[word+'correct']? (scores[word+'correct']/(scores[word+'correct']+scores[word+'incorrect'])) : 0;
        if(isNaN(score)) score=0.9999;
        children.push(<div style={{background:colors[Math.floor(score*colors.length)]}}>{word}</div>)
        total += score;
    })
    const rating = (total/words.length);
  return (<>
    <header className="App-header">
        <span className='App-header-span'>Spell Master</span>
      </header>
      <Profile rating={rating} />
      <h3>Word wall</h3>
    <div className="wordWall-container"><div className="wordwall">
        
        {children}
    </div></div>
    
        <HomeButton handleMenuClick={handleMenuClick} />
        
    </>
  )
}

export default WordWall