import React from 'react'

function HomeButton({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  return (
    <button onClick={()=>handleMenuClick("")}>Go back</button>
  )
}

export default HomeButton