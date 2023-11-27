import React, { useContext, useState } from 'react'
import { UserContext } from './context/user'
import ReviewCard from './ReviewCard'


export default function HerbCard({ herbInfo, herbs, setHerbs }) {
    const { name, reviews, id } = herbInfo 
    const { user, updateHerbsReviewed, updateDeletedHerbReview } = useContext(UserContext)
    const [showForm, setShowForm] = useState(false)
    const [newReview, setNewReview] = useState({ rating: 0, content: '', herb_id: id});
    const [selectedReview, setSelectedReview] = useState(null)
    const [errors, setErrors] = useState([]);


    const reviewList = reviews.map((review) => <ReviewCard key={review.id} reviewInfo={review} selectedReview={selectedReview} setSelectedReview={setSelectedReview} handleUpdatedReviews={handleUpdatedReviews} handleReviewDelete={handleReviewDelete} />)

    function addReview(){
        setShowForm(true)
    }

    function handleUpdatedReviews(updatedReview) {
      setSelectedReview(null);

      let herbToUpdate = herbs.find((herb) => herb.id === updatedReview.herb.id);
      let updatedReviews = herbToUpdate.reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );

      let updatedHerbs = herbs.map((herb) =>
        herb.id === herbToUpdate.id ? { ...herb, reviews: updatedReviews } : herb
      );

      setHerbs(updatedHerbs);
    }

    function handleReviewSubmit(e){
        e.preventDefault();

        // Check if the rating is within the valid range (1-5)
        if (newReview.rating < 1 || newReview.rating > 5) {
          // Handle the case where the rating is invalid (e.g., show an error message)
          console.error('Invalid rating. Please enter a rating between 1 and 5.');
        return;
  }
        // Check if the user is available before setting user_id in newReview
        // Submit a new review to your Rails backend using an API request
        // Update the 'herbs' state with the newly added review for the specific herb
            fetch('/reviews', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newReview)
            }).then((r) => {
                if(r.ok) {
                  r.json().then((data) => {
                  let herbToUpdate = herbs.find((herb) => herb.id === id)
                  let updatedReviews = [...herbToUpdate.reviews, data]
                  let updatedHerbs = herbs.map((herb) => herb.id === herbToUpdate.id ? { ...herb, reviews: updatedReviews } : herb);
                  setHerbs(updatedHerbs)
                  updateHerbsReviewed(data)
                  setNewReview({ rating: 0, content: '', herb_id: id})
                  setShowForm(false)
                  })
                } else {
                  r.json().then((error) => setErrors(error.errors));
                }
            });
      };

    function handleReviewDelete(deletedReview){
      fetch(`/reviews/${deletedReview.id}`, {
        method: 'DELETE'
      })
      let herbToUpdate = herbs.find((herb) => herb.id === deletedReview.herb.id)
      let updatedReviews = herbToUpdate.reviews.filter((review) => review.id != deletedReview.id) 
      let updatedHerbs = herbs.map((herb) => herb.id === herbToUpdate.id ? {...herb, reviews: updatedReviews} : herb)
      setHerbs(updatedHerbs)
      updateDeletedHerbReview(deletedReview)
    }

  return (
    <div>
        <h2>{name.toUpperCase()}</h2>

      <div>{reviewList}</div>
      {user && <button onClick={addReview}>Add Review</button>}
      {showForm && (
        <div>
          <form onSubmit={handleReviewSubmit}>
            <div>
                <label>Rating:</label>
                <input
                  type="number"
                  value={newReview.rating}
                  onChange={(e) => {
                    const enteredRating = parseInt(e.target.value, 10);
                    // Check if the entered rating is within the valid range (1-5)
                    if (enteredRating >= 1 && enteredRating <= 5) {
                        setNewReview({ ...newReview, rating: enteredRating });
                    }
                    // } else {
                    //     console.error('Invalid rating. Please enter a rating between 1 and 5.');
                    //     setErrors(['Invalid rating. Please enter a rating between 1 and 5.'])
                    // }
                }}
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
              <div>
              {Array.isArray(errors) && errors.map((error) => <div key={error}>{error}</div>)}
              </div>
            <button type="submit">Create Review</button>
            <button onClick={() => {
              setNewReview({ rating: 0, content: '', herb_id: id})
              setShowForm(false)}
              }>
                Cancel
              </button>
          </form>
        </div>
      )}
    </div>
  );
}
