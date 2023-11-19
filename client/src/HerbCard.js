import React, { useContext, useState } from 'react'
import { UserContext } from './context/user'
import ReviewCard from './ReviewCard'

export default function HerbCard({ herbInfo, herbs, setHerbs }) {
    const { name, reviews, id } = herbInfo 
    const {user} = useContext(UserContext)
    const [showForm, setShowForm] = useState(false)
    const [newReview, setNewReview] = useState({ rating: 0, content: '', herb_id: id});
    const [selectedReview, setSelectedReview] = useState(null)

    const reviewList = reviews.map((review) => <ReviewCard key={review.id} reviewInfo={review} selectedReview={selectedReview} setSelectedReview={setSelectedReview} handleUpdatedReviews={handleUpdatedReviews}/>)

    function addReview(){
        setShowForm(true)
    }

    function handleUpdatedReviews(updatedReview){
      // let updatedReviews = reviews.map(review => reviews.id === updatedReview.id ? updatedReview : review)
      // update state so that updated review shows on herb card
      // how to manipulate reviewList
      console.log("updatedReview in handleupdatedReview function", updatedReview.herb.id)
      setSelectedReview(null)
      let herbToUpdate = herbs.find((herb) => herb.id === updatedReview.herb.id)
      console.log("herbToUpdate.reviews", herbToUpdate.reviews)
      let updatedReviews = herbToUpdate.reviews.map((review) => {
        if(review.id == updatedReview.id){
          return updatedReview
        } else {
          return review
        }
      })
      let updatedHerbs = herbs.map((herb) => {
        if (herb.id === herbToUpdate.id){
          return {...herb, reviews: updatedReviews}
        } else {
          return herb
        }
      })
      setHerbs(updatedHerbs)
  }

    function handleReviewSubmit(e){
        e.preventDefault();
        // Check if the user is available before setting user_id in newReview
        // Submit a new review to your Rails backend using an API request
        // Update the 'herbs' state with the newly added review for the specific herb
            fetch('/reviews', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newReview)
            }).then((r) => r.json())
                .then((data) => {
                  // console.log("data post fetch", data)
                  let herbToUpdate = herbs.find((herb) => herb.id === id)
                  let updatedReviews = [...herbToUpdate.reviews, data]
                  let updatedHerbs = herbs.map((herb) => {
                    if (herb.id === herbToUpdate.id){
                      return {...herb, reviews: updatedReviews}
                    } else {
                      return herb
                    }
                  })
                  setHerbs(updatedHerbs)
                  setNewReview({ rating: 0, content: '', herb_id: id})
                  setShowForm(false)
              });
    };

    // add review
    // if review belongs to user, user should be able to edit & delete review

  return (
    <div>
      <h1>{name}</h1>
      <div>{reviewList}</div>
      {user ? <button onClick={addReview}>Add Review</button> : null}
      {showForm ? 
      <div>
        <form onSubmit={handleReviewSubmit}>
              <div>
                <label>Rating:</label>
                <input
                  type="number"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                />
              </div>
              <div>
                <label>Comment:</label>
                <input
                  type="text"
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                />
              </div>
              <button type="submit">Create Review</button>
            </form>
      </div>
      : null
    }
    </div>
  )
}
