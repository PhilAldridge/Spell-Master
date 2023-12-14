import React, { useEffect, useState } from "react";
import TextToSpeech from './TTS';
import * as files from './words/files.json';
import Cookies from 'universal-cookie';
import KeyboardComponent from "./Keyboard";

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

function SpellWord({word, submitAnswer}:{word:string, submitAnswer: (correct:boolean)=>void}) {
    const [input,setInput]=useState("");
    const [attempted, setAttempted] = useState(false);
    const [correct, setCorrect] = useState<boolean>();
    const [imgSrc,setImgSrc]= useState("");

    const cookies = new Cookies(null, { path:'/'});

    useEffect(()=>{
        const directory = (files as unknown as directory).default[0].contents.find(folder => folder.type === "directory" && folder.name === word)?.contents;
        if(!directory) return;
        const images = directory.find(folder=>folder.type ==="directory" && folder.name === 'images')?.contents?.map(file=>file.name);
        if(!images) return;
        const imagesFiltered = images.filter(filename => !filename.endsWith('.Identifier'))
        
        setImgSrc(`./words/${word.toLowerCase()}/images/${imagesFiltered[Math.floor(Math.random()*imagesFiltered.length)]}`);
    },[word])

    return (
        <div>
            <div>{imgSrc !== '' && <img alt="hint" src={imgSrc}/>}</div>
            
            <div className="spell-word-input">
                <input type="text" value={input} onChange={e=>setInput(e.target.value)} disabled onKeyUp={handleKeyDown} placeholder="spell the word"/>
                <TextToSpeech text={word}/>
            </div>
            {correct!==undefined &&
                    (correct? <div>Well done!</div> : 
                    <div>Oops! The correct answer was {word}</div>)
                }
            <KeyboardComponent input={input} onChange={e=>setInput(e)} onSubmit={handleSubmit}/>
        </div>
    )

  function handleSubmit() {
    const correct = input.toLowerCase()===word.toLowerCase();
    if(!cookies.get(word+"correct")) {
        cookies.set(word+"correct",0); 
    }
    if(!cookies.get(word+"incorrect")) {
        cookies.set(word+"incorrect",4);
    }
    if(correct) {
        cookies.set(word+"correct",Number(cookies.get(word+"correct"))+1)
    } else {
        cookies.set(word+"incorrect",Number(cookies.get(word+"incorrect"))+1)
    }
    setCorrect(correct)
    submitAnswer(correct)
    setAttempted(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key==='Enter') handleSubmit();
  }
}

export default SpellWord