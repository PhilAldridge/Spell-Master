import { useState } from 'react'
import {wordString} from './words/words2';
import SpellWord from './SpellWord';
import './Race.css';
import MultipleChoice from './MultipleChoice'
import Results from './Results'
import Cookies from 'universal-cookie';
import useSound from 'use-sound';
const words = wordString.split('\n');

function TrickyWords({handleMenuClick}:
            {handleMenuClick:(input:string)=>void}) {
    const [correct, setCorrect] = useState<string[]>([]);
    const [incorrect, setIncorrect] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>();

    const [playCorrect] = useSound('/sounds/correct.mp3', {volume:0.2});
    const [playIncorrect] = useSound('/sounds/incorrect.mp3', {volume:0.4});
    const cookies = new Cookies();
    const scores = cookies.getAll();
    const sortedWords = words.sort((a,b)=>compareWords(a,b))
    if(!currentWord){
        setCurrentWord(sortedWords[Math.floor(Math.random()*10)]);
    }

    let child = () => {
        if(!currentWord) return null; 
        if((correct.length + incorrect.length) % 2 ===0) return <SpellWord word={currentWord} submitAnswer={submitAnswer} key={'word'+correct+incorrect} />
        return <MultipleChoice wrd={currentWord} submitAnswer={submitAnswer} key={'word'+correct+incorrect}/>
    }

  return (
    <div className='race'>
        <div className='race-info'>
            <div className='correct-display'>Correct: {correct.length}</div>
            <div className='incorrect-display'>Incorrect: {incorrect.length}</div>
        </div>
        {(correct.length + incorrect.length)<10?
            child()
            :
            <Results correct={correct} incorrect={incorrect} handleMenuClick={handleMenuClick} />
        }
        
    </div>
  )

  function submitAnswer(correctAnswer:boolean) {
    correctAnswer? playCorrect() :playIncorrect();
    let newWord = sortedWords[Math.floor(Math.random()*10)];
    while(newWord === currentWord) {
        newWord = sortedWords[Math.floor(Math.random()*10)];
    }
    setTimeout(()=>{
      if(correctAnswer) {
          setCorrect([...correct,currentWord as string])
      } else {
          setIncorrect([...incorrect,currentWord as string])
      }
      setCurrentWord(newWord)
    },correctAnswer? 1000:2000)
    
  }

  function compareWords(w1:string,w2:string):number {
    const score1 = scores[w1+'correct']? (scores[w1+'correct']/(scores[w1+'correct']+scores[w1+'incorrect'])) : 0;
    const score2 = scores[w2+'correct']? (scores[w2+'correct']/(scores[w2+'correct']+scores[w2+'incorrect'])) : 0;
    return score1 - score2;
  }
}

export default TrickyWords