import { ReactElement, useEffect, useState } from 'react'
import Mole from './Mole'
import useSound from 'use-sound'
import HomeButton from './HomeButton';
import './MoleGame.css'
import Timer from './Timer';

export default function MoleGame({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
    const [time, setTime] = useState(60);
    const [lives, setLives] = useState(5);
    const [score, setScore] = useState(0);
    const [interval1, setInterval1] = useState<NodeJS.Timer>();
    const [playSplat] = useSound('/sounds/splat.mp3', {volume:0.2});
    const [playCorrect] = useSound('/sounds/correct.mp3', {volume:0.2});
    const [playIncorrect] = useSound('/sounds/incorrect.mp3', {volume:0.4});

    let hearts:ReactElement[] =[];
    for(let i=0;i<lives;i++) hearts.push(<>&#x2665;</>)

    useEffect(()=>{
        let interval = setInterval(()=> {
                setTime(t=>t-1);
            
        },1000)
        setInterval1(interval);
        return ()=>{clearInterval(interval)}
    },[])

    if(time<0 || lives<1) {
        clearInterval(interval1)
        return (
            <div>
                <div>{lives<1 ? <>You died!</> : <>Time's up</>}</div>
                <div>You got {score} points</div>
                <HomeButton handleMenuClick={handleMenuClick} />
            </div>
        )
    }
  return (
    <div className='moles-game'>
        <div className='moles-header'>
            <div className='moles-title'>Only hit the moles with the correct spelling</div>
            <div className='lives'>Lives: <span className='hearts'>{hearts}</span></div>
            <div className='score'>Score: {score}</div>
            <Timer timeLeft={time} />
        </div>
        <div className='moles'>
            <Mole handleClick={handleClick} key='mole1' />
            <Mole handleClick={handleClick} key='mole2'/>
            <Mole handleClick={handleClick} key='mole3'/>
            <Mole handleClick={handleClick} key='mole4'/>
            <Mole handleClick={handleClick} key='mole5'/>
            <Mole handleClick={handleClick} key='mole6'/>
        </div>
        
    </div>
  )

  function handleClick(correct:boolean){
    playSplat();
    if(correct){
        setScore(s=>s+1)
        playCorrect();
    } else {
        setLives(l=>l-1);
        playIncorrect();
    }
  }
}
