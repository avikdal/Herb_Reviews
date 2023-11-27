import React from 'react';
import { Link } from 'react-router-dom';
import HerbCard from './HerbCard';

export default function Herbs({ herbs , setHerbs }) {


  const herbCards = herbs.map((herb) => (
    <HerbCard key={herb.id} herbInfo={herb} herbs={herbs} setHerbs={setHerbs} />
  ));

  return (
    <div>
      <h1>HERBS</h1>
      <Link to="/herbs/new">
        <button>Add New Herb</button>
      </Link>
      <div>{herbCards}</div>
    </div>
  );
}
