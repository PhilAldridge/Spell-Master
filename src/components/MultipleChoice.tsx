import { useState } from 'react'
import getJumbledWords from '../lib/confuse'
import Cookies from 'universal-cookie';
import './MultipleChoice.css'

function MultipleChoice({wrd, submitAnswer}:{wrd:string, submitAnswer: (correct:boolean)=>void}) {
    const [mixUps, setMixups] = useState<string[]>();
    const [indexOfCorrect,setIndex] = useState(0);
    const [attempted, setAttempted] = useState(false);
    const [correct, setCorrect] = useState<boolean>(false);
    const cookies = new Cookies(null, { path:'/'});

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
                    <div>Oops! The correct answer was {wrd}</div>)
        }
    </div>
  )

  function handleSubmit(correct:boolean) {
    if(!cookies.get(wrd+"correct")) {
        cookies.set(wrd+"correct",0); 
    }
    if(!cookies.get(wrd+"incorrect")) {
        cookies.set(wrd+"incorrect",4);
    }
    if(correct) {
        cookies.set(wrd+"correct",Number(cookies.get(wrd+"correct"))+1)
    } else {
        cookies.set(wrd+"incorrect",Number(cookies.get(wrd+"incorrect"))+1)
    }
    setCorrect(correct)
   submitAnswer(correct)
    setAttempted(true)
  }
}

export default MultipleChoice