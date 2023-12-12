import BarChart from "./BarChart"
import HomeButton from "./HomeButton"
import './Results.css';

function Results({correct,incorrect,handleMenuClick}:{correct:string[],incorrect:string[],handleMenuClick:(str:string)=>void}) {
  return (
    <div className="results-div">
        <div>Your results</div>
        <BarChart correct={correct.length} incorrect={incorrect.length} />
        <div>Mistaken words</div>
        <div className='mistaken-words'>
            {incorrect.map(word=><div>{word}</div>)}
        </div>
        <HomeButton handleMenuClick={handleMenuClick} />
    </div>
  )
}

export default Results