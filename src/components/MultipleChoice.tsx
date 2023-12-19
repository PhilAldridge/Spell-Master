import { useState } from 'react'
import getJumbledWords from '../lib/confuse'
import { getData, setData } from '../lib/data';
import './MultipleChoice.css'

function MultipleChoice({wrd, submitAnswer}:{wrd:string, submitAnswer: (correct:boolean)=>void}) {
    const [mixUps, setMixups] = useState<string[]>();
    const [indexOfCorrect,setIndex] = useState(0);
    const [attempted, setAttempted] = useState(false);
    const [correct, setCorrect] = useState<boolean>(false);

    if(!mixUps) {
        const jumble = getJumbledWords(wrd)
        const index = Math.floor(Math.random()*(jumble.length+1))
        setIndex(index)
        setMixups([...jumble.slice(0,index),wrd,...jumble.slice(index)])
    }
    
    

  return (
    <div className='mixUps'>
        <h2>Choose the correct spelling:</h2>
        {mixUps &&
            mixUps.map((str,i)=> 
                <button 
                    onClick={()=>handleSubmit(i===indexOfCorrect)} 
                    disabled={attempted}
                    className={attempted.toString() + (i===indexOfCorrect).toString()}
                >{str}</button>)
        }
         {attempted &&
                    (correct? <div>Well done!</div> : 
                    <div className="correction">{wrd}</div>)
        }
    </div>
  )

  async function handleSubmit(correct:boolean) {

    let correctData = await getData(wrd+"correct");
    let incorrectData = await getData(wrd+"incorrect");
    if(!correctData){
        await setData(wrd+"correct",'0');
        correctData='0';
    } 
    if(!incorrectData){
        await setData(wrd+"incorrect",'4');
        incorrectData='4';
    } 
    if(correct) {
        await setData(wrd+"correct",(Number(correctData)+1).toString());
    } else {
        await setData(wrd+"incorrect",(Number(incorrectData)+1).toString());
    }

    setCorrect(correct)
   submitAnswer(correct)
    setAttempted(true)
  }
}



export default MultipleChoice