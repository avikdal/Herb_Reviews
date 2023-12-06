import React, { useState } from 'react'

export default function EditReviewForm({ review, handleChangeForm, handleUpdatedReviews }) {
    const { rating, content } = review
    const [errors, setErrors] = useState([]);


    function handleSubmit(e){
        e.preventDefault()
        console.log(review)
        fetch(`/reviews/${review.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
        })
        .then(r => {
          if (r.ok){
          r.json().then(review => handleUpdatedReviews(review))
          } else {
            r.json().then((error) => setErrors(error.errors));
          }
    })
    }

  return (
    <div>
      <h1>Edit this Review</h1>
      <form className="entry-form" onSubmit={handleSubmit}>
            <input
                type="number"
                name="rating"
                placeholder="rating"
                value={rating}
                onChange={(e) => {
                  const enteredRating = parseInt(e.target.value, 10);
                  if (enteredRating >= 1 && enteredRating <= 5) {
                  handleChangeForm(e.target.name, e.target.value)
                } 
                }}
            />
            <input
                type="text"
                name="content"
                placeholder="content"
                value={content}
                onChange={(e) => handleChangeForm(e.target.name, e.target.value)}
            />
            <div>
              {Array.isArray(errors) && errors.map((error) => <div key={error}>{error}</div>)}
            </div>
            <button className="button" type="submit">Update Review</button>
      </form>
    </div>
  )
}
