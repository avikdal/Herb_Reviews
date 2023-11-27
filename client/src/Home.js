import React, { useContext, useState } from 'react';
import { UserContext  } from './context/user';
import Login from './Login';
import Signup from './Signup';

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useContext(UserContext)

  if(!user || user.error ){

    return(
      <div>
      {showLogin ? (
      <>
        <Login />
        <p>
          Don't have an account? &nbsp;
          <button color="secondary" onClick={() => setShowLogin(false)}>
            Sign Up
          </button>
        </p>
      </>
    ) : (
      <>
        <Signup />
        <p>
          Already have an account? &nbsp;
          <button color="secondary" onClick={() => setShowLogin(true)}>
            Log In
          </button>
        </p>
      </>
    )}
    </div>
    )
  } else {

    const reviewedHerbsList = user.herbs.map((review) => <ul key={review.id}>{review.name}</ul>)

  return (
    <div>
      <h1> Hello {user.username} </h1>
      <h4>Here is a list of all the herbs you have written a review for;</h4>
      <ul>
      {reviewedHerbsList}
    </ul>
    </div>
  )
  }
}
