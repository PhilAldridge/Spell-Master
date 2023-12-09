import React from 'react'

function HomeButton({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  return (
    <button className='home-button' onClick={()=>handleMenuClick("menu")}>Go back</button>
  )
}

export default HomeButton