import { useState } from 'react'
import { words } from './words/words';
import SpellWord from './SpellWord';
import './Race.css';
import MultipleChoice from './MultipleChoice'
import Results from './Results'
import Cookies from 'universal-cookie';

function TrickyWords({handleMenuClick}:
            {handleMenuClick:(input:string)=>void}) {
    const [correct, setCorrect] = useState<word[]>([]);
    const [incorrect, setIncorrect] = useState<word[]>([]);
    const [currentWord, setCurrentWord] = useState<word>();

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
    if(correctAnswer) {
        setCorrect([...correct,currentWord as word])
    } else {
        setIncorrect([...incorrect,currentWord as word])
    }
    let newWord = sortedWords[Math.floor(Math.random()*10)];
    while(newWord === currentWord) {
        newWord = sortedWords[Math.floor(Math.random()*10)];
    }
    setCurrentWord(newWord)
  }

  function compareWords(w1:word,w2:word):number {
    const score1 = scores[w1.word+'correct']? (scores[w1.word+'correct']/(scores[w1.word+'correct']+scores[w1.word+'incorrect'])) : 0;
    const score2 = scores[w2.word+'correct']? (scores[w2.word+'correct']/(scores[w2.word+'correct']+scores[w2.word+'incorrect'])) : 0;
    return score1 - score2;
  }
}

export default TrickyWords