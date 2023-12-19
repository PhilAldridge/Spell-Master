import BarChart from "./BarChart"
import HomeButton from "./HomeButton"
import './Results.css';
import { getData, setData } from "../lib/data";
import { useEffect, useState } from "react";

function Results({correct,incorrect,handleMenuClick}:{correct:string[],incorrect:string[],handleMenuClick:(str:string)=>void}) {
  const [best,setBest] = useState<number>()
  useEffect(()=>{
    async function getBest(score:number) {
      const best = Number(await getData('best-score')) || 0;
      if(best<score) await setData('best-score',score.toString())
      setBest(best)
    }
    getBest(correct.length);
  },[correct])
  
  return (
    <div className="results-div">
        <div>Your results</div>
        <BarChart correct={correct.length} incorrect={incorrect.length} />
        <div>Your previous best was {best} correct</div>
        <h3>Mistaken words</h3>
        <div className='mistaken-words'>
            {incorrect.map(word=><div>{word}</div>)}
        </div>
        <HomeButton handleMenuClick={handleMenuClick} />
    </div>
  )
}

export default Results