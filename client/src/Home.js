import React, { useContext, useState } from 'react';
import { UserContext  } from './context/user';
import Login from './Login';
import Signup from './Signup';

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useContext(UserContext)
  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   // Set the initial reviews when the component mounts
  //   // console.log("user in useEffect", user);
  //   if (user && user.herbs) {
  //     // console.log("in useEffect", user.herbs)
  //     setHerbsReviewed(user.herbs);
  //   }
  // }, [user]);

  // const handleNewReview = (newReview) => {
  //   // Update the state to include the new review
  //   setReviews((prevReviews) => [...prevReviews, newReview]);
  // };

  // console.log("herbsReviewed in home ", herbsReviewed)

  // console.log("user herbs", user.herbs)
  // console.log("reviews", reviews)

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
