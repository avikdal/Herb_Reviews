import React from 'react'

export default function EditReviewForm({ review, handleChangeForm, handleUpdatedReviews }) {
    const { rating, content } = review

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/reviews/${review.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
        })
        .then(r => r.json())
        .then(review => handleUpdatedReviews(review))
    }

  return (
    <div>
      <h1>Edit this Review</h1>
      <form className="entry-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="rating"
                placeholder="rating"
                value={rating}
                onChange={(e) => handleChangeForm(e.target.name, e.target.value)}
            />
            <input
                type="text"
                name="content"
                placeholder="content"
                value={content}
                onChange={(e) => handleChangeForm(e.target.name, e.target.value)}
            />
            <button className="button" type="submit">Update Review</button>
      </form>
    </div>
  )
}
