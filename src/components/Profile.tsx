import {animals} from './words/animals'
import './Profile.css'

export default function Profile({rating}:{rating:number}) {
    const animal:animal = animals[Math.floor(rating*animals.length)]
    const percent = Math.ceil(rating*100);
  return (
    <div className="profile">
      <div>
        <div>Your rating:</div>
        <div> {percent}/100</div>
        <div className='progress-border'>
            <div className='progress-bar' style={{width:percent}}></div>
        </div>
      </div>
      <div className="animal">
        <img src={'./animals/'+animal.src} alt={animal.name} />
        <div>{animal.name}</div>
      </div>
    </div>
  )
}

type animal = {
    name:string
    src:string
}