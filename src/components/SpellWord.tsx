import React, { useEffect, useState } from "react";
import TextToSpeech from './TTS';
import * as files from './words/files.json';
import { getData,setData } from "../lib/data";
import KeyboardComponent from "./Keyboard";
import { Capacitor } from "@capacitor/core";

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
    const isMobile = Capacitor.isNativePlatform();

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
                <input 
                    type="text"
                    value={input} 
                    onChange={e=>setInput(e.target.value)} 
                    autoFocus={!isMobile} 
                    disabled={isMobile} 
                    onKeyUp={handleKeyDown} 
                    placeholder="spell the word"
                />
                <TextToSpeech text={word}/>
            </div>
            {correct!==undefined &&
                    (correct? <div>Well done!</div> : 
                    <div className="correction">{word}</div>)
                }
            {isMobile && <KeyboardComponent 
                input={input} 
                onChange={e=>setInput(e)} 
                onSubmit={handleSubmit}/>}
        </div>
    )

  async function handleSubmit() {
    if(attempted) return;
    const correct = input.toLowerCase()===word.toLowerCase();
    let correctData = await getData(word+"correct");
    let incorrectData = await getData(word+"incorrect");
    if(!correctData){
        await setData(word+"correct",'0');
        correctData='0';
    } 
    if(!incorrectData){
        await setData(word+"incorrect",'4');
        incorrectData='4';
    } 
    if(correct) {
        await setData(word+"correct",(Number(correctData)+1).toString());
    } else {
        await setData(word+"incorrect",(Number(incorrectData)+1).toString());
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