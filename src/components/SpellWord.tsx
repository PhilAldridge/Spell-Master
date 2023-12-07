import React, { useEffect, useState } from "react";
import TextToSpeech from './TTS';
import * as files from './words/files.json';
import Cookies from 'universal-cookie'

type directory = {
    default: [
        {
            contents: directoryObject[]
        }
    ]
}

type directoryObject = {
    type:string
    name:string
    contents?:directoryObject[]
}

function SpellWord({word, submitAnswer}:{word:word, submitAnswer: (correct:boolean)=>void}) {
    const [input,setInput]=useState("");
    const [attempted, setAttempted] = useState(false);
    const [correct, setCorrect] = useState<boolean>();
    const [imgSrc,setImgSrc]= useState("");

    const cookies = new Cookies(null, { path:'/'});

    useEffect(()=>{
        const directory = (files as unknown as directory).default[0].contents.find(folder => folder.type === "directory" && folder.name === word.word)?.contents;
        if(!directory) return;
        const images = directory.find(folder=>folder.type ==="directory" && folder.name === 'images')?.contents?.map(file=>file.name);
        if(!images) return;
        setImgSrc(`./words/${word.word}/images/${images[Math.floor(Math.random()*images.length)]}`);
    },[word])

    return (
        <div>
            <div>{imgSrc !== '' && <img alt="hint" src={imgSrc}/>}</div>
            <div className="spell-word-instructions">
                Spell the word you can hear:
                <TextToSpeech text={word.word}/>
            </div>
            <div className="spell-word-input">
                <input type="text" value={input} onChange={e=>setInput(e.target.value)} autoFocus onKeyUp={handelKeyDown}/>
                <button onClick={handleSubmit} disabled={attempted || input ===""}>&#x23CE;</button>
                
            </div>
            {correct!==undefined &&
                    (correct? <div>Well done!</div> : 
                    <div>Oops! The correct answer was {word.word}</div>)
                }
        </div>
    )

  function handleSubmit() {
    if(!cookies.get(word.word+"correct")) {
        cookies.set(word.word+"correct",0);
        cookies.set(word.word+"incorrect",10);
    }
    if(input===word.word) {
        cookies.set(word.word+"correct",Number(cookies.get(word.word+"correct"))+1)
    } else {
        cookies.set(word.word+"incorrect",Number(cookies.get(word.word+"incorrect"))+1)
    }
    setCorrect(input===word.word)
    setTimeout(()=>submitAnswer(input===word.word),1500)
    setAttempted(true)
  }

  function handelKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key==='Enter') handleSubmit();
  }
}

export default SpellWord