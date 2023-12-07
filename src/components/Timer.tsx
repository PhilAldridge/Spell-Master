import React from 'react'

function Timer({timeLeft}:{timeLeft:number}) {
    
  return (
    <div className='timer'>Time left: {timeLeft}</div>
  )
}

export default Timer