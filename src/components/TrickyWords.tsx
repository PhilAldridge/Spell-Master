import { useEffect, useState } from 'react'
import {wordString} from './words/words2';
import SpellWord from './SpellWord';
import './Race.css';
import MultipleChoice from './MultipleChoice'
import Results from './Results'
import useSound from 'use-sound';
import { getData, getKeys } from '../lib/data';
const words = wordString.split('\n');

function TrickyWords({handleMenuClick}:
            {handleMenuClick:(input:string)=>void}) {
    const [correct, setCorrect] = useState<string[]>([]);
    const [incorrect, setIncorrect] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>();
    const [trickyWords,setTrickyWords] = useState<string[]>();
    const [playCorrect] = useSound('/sounds/correct.mp3', {volume:0.2});
    const [playIncorrect] = useSound('/sounds/incorrect.mp3', {volume:0.4});

    useEffect(()=>{
      async function getTrickyWords(){
        const keys = await getKeys();
        let scores:Map<string,number> = new Map();
        for(let i=0; i<keys.length;i++){
          const value = await getData(keys[i]);
          scores.set(keys[i], Number(value)||0);
        }
        const sortedWords = words.sort((a,b)=>compareWords(a,b,scores))
        setTrickyWords(sortedWords.slice(0,10));
      }

      getTrickyWords();
    },[])
    if(!currentWord && trickyWords){
        setCurrentWord(trickyWords[Math.floor(Math.random()*10)]);
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
    let newWord = (trickyWords||words)[Math.floor(Math.random()*10)];
    while(newWord === currentWord) {
        newWord = (trickyWords||words)[Math.floor(Math.random()*10)];
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

  function compareWords(w1:string,w2:string,scores:Map<string,number>):number {
    const score1 = (scores.get(w1+'correct')||0)/((scores.get(w1+'correct')||0)+(scores.get(w1+'incorrect')||1));
    const score2 = (scores.get(w2+'correct')||0)/((scores.get(w2+'correct')||0)+(scores.get(w2+'incorrect')||1));
    return score1 - score2;
  }
}

export default TrickyWords