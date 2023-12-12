import { useEffect } from 'react'
import './CountDown.css'

export default function CountDown({handleMenuClick}:{handleMenuClick:()=>void}) {
    useEffect(()=>{
        const timeOut = setTimeout(()=>handleMenuClick(),4000);

        return (()=>clearTimeout(timeOut));
    },[handleMenuClick])


  return (
    <div className='countdown-container'>
        <div>Get ready...</div>
        <div className='countdown'>
            <div>3</div>
            <div>2</div>
            <div>1</div>
            <div>Go!</div>
        </div>
    </div>
  )
}
