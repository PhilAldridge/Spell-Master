import BarChart from "./BarChart"
import HomeButton from "./HomeButton"
import './Results.css';
import Cookies from "universal-cookie";

function Results({correct,incorrect,handleMenuClick}:{correct:string[],incorrect:string[],handleMenuClick:(str:string)=>void}) {
  const cookies = new Cookies(null, { path:'/'});
  const best = cookies.get('best-score') || 0;
  if(best<correct.length) cookies.set('best-score',correct.length)
  
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