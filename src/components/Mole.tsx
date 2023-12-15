import { useState } from "react"
import getJumbledWords from '../lib/confuse'
import {wordString} from './words/words2';
import useSound from "use-sound";
const words = wordString.split('\n');

export default function Mole({handleClick}:{handleClick:(corr:boolean)=>void}) {
    const [word, setWord] = useState('');
    const [correctSpelling, setCorrectSpelling] = useState(false);
    const [visible, setVisible] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [playWoo] = useSound('/sounds/woo.mp3', {volume:0.4, playbackRate: 1.2});

    if(word==='') getWord();

    return <div className="mole-object">
        {visible &&
            <div className="mole-div">
                <img src="/molegame/doraemon.png" className="mole" alt="mole" onClick={clickMole}/>
                <div className="mole-game-word" onClick={clickMole}>{word}</div>
            </div>
        }
        <img src="/molegame/soil.png" className="soil" alt="soil"/>
        
        {clicked && <img src='/molegame/splat.png' className="splat" alt="splat" />}
    </div>

    function getWord() {
        setVisible(false)
        setClicked(false)
        const word2 = words[Math.floor(Math.random()*words.length)];
        if(Math.random()>0.5) {
            setWord(word2)
            setCorrectSpelling(true)
        } else {
            setWord(getJumbledWords(word2)[0])
            setCorrectSpelling(false)
        }
        setTimeout(()=>{
            playWoo();
            if(!visible) {
                setTimeout(()=>getWord(),4000) 
            }
            setVisible(true);
        },Math.round(Math.random()*3000))
    }

    function clickMole() {
        if(clicked) return;
        setTimeout(()=>getWord(),1000);
        setClicked(true);
        handleClick(correctSpelling);
    }
}