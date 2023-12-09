import { useEffect, useState } from 'react'
import { words } from './words/words';
import Timer from './Timer';
import SpellWord from './SpellWord';
import './Race.css';
import Results from './Results';
import MultipleChoice from './MultipleChoice'

function Race({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
    const [time, setTime] = useState(60);
    const [correct, setCorrect] = useState<word[]>([]);
    const [incorrect, setIncorrect] = useState<word[]>([]);
    const [currentWord, setCurrentWord] = useState<word>();
    const [interval1, setInterval1] = useState<NodeJS.Timer>();

    useEffect(()=>{
        let interval = setInterval(()=> {
                setTime(t=>t-1);
            
        },1000)
        setCurrentWord(words[Math.floor(Math.random()*words.length)]);
        setInterval1(interval);
        return ()=>{clearInterval(interval)}
    },[])

    if(time<0) {
        clearInterval(interval1)
    }

    let child = () => {
        if(!currentWord) return null;
        if((correct.length + incorrect.length) % 2 ===0) return <SpellWord word={currentWord} submitAnswer={submitAnswer} key={'word'+correct+incorrect} />
        return <MultipleChoice wrd={currentWord} submitAnswer={submitAnswer} key={'word'+correct+incorrect}/>
    }

  return (
    <div className='race'>
        <div className='race-info'>
            <Timer timeLeft={Math.max(time,0)} />
            <div className='correct-display'>Correct: {correct.length}</div>
            <div className='incorrect-display'>Incorrect: {incorrect.length}</div>
        </div>
        {time>=0?
            child()
            :
            <Results correct={correct} incorrect={incorrect} handleMenuClick={handleMenuClick} />
        }
        
    </div>
  )

  function submitAnswer(correctAnswer:boolean) {
    if(correctAnswer) {
        setCorrect([...correct,currentWord as word])
    } else {
        setIncorrect([...incorrect,currentWord as word])
    }
    let newWord = words[Math.floor(Math.random()*words.length)];
    while(newWord === currentWord) {
        newWord = words[Math.floor(Math.random()*words.length)];
    }
    setCurrentWord(newWord)
  }
}

export default Race