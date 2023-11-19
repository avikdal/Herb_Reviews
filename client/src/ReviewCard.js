import React, { useContext } from 'react';
import { UserContext } from './context/user';
import Card from 'react-bootstrap/Card';
import EditReviewForm from './EditReviewForm';

export default function ReviewCard({ reviewInfo, selectedReview, setSelectedReview, handleUpdatedReviews }) {
  const { user } = useContext(UserContext);
  const { rating, content, id } = reviewInfo;

  function handleClick() {
    setSelectedReview(reviewInfo);
  }

  function handleChangeForm(name, value) {
    setSelectedReview({
      ...selectedReview,
      [name]: value,
    });
  }

  return (
    <Card style={{ width: '18rem', border: '2px solid' }}>
      <Card.Body>
        <Card.Title>Rating:{rating}/5</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{reviewInfo.user.username}</Card.Subtitle>
        <Card.Text> "{content}" </Card.Text>
        {user && user.username === reviewInfo.user.username && (
          <button onClick={handleClick}>Edit Review</button>
        )}
        {selectedReview && selectedReview.id === id && (
          <EditReviewForm review={selectedReview} handleChangeForm={handleChangeForm} handleUpdatedReviews={handleUpdatedReviews} />
        )}
      </Card.Body>
    </Card>
  );
}
