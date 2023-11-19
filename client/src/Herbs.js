import React, { useState, useEffect } from 'react'
import HerbCard from './HerbCard'

export default function Herbs() {
    const [herbs, setHerbs] = useState([])

    useEffect(() => {
        fetch('/herbs')
        .then(r => r.json())
        .then(herbData => setHerbs(herbData))
      }, [])
    

    const herbCards = herbs.map((herb) => <HerbCard key={herb.id} herbInfo={herb} herbs={herbs} setHerbs={setHerbs} />)

  return (
    <div>
      <h1> Herbs</h1>
      {herbCards}
    </div>
  )
}
