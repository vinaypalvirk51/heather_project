import React, { useEffect, useState } from "react";
import axios from "axios";
import reviewsImage from "../assets/reviews.jpg"; // ✅ Import the review image

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4005/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error("Error fetching reviews", err));
  }, []);

  return (
    <div style={style}>
      <img
        src={reviewsImage}
        alt="Reviews"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Reviews</h2>
      {reviews.map((r, i) => (
        <div key={i} style={card}>
          <p><b>Product:</b> {r.productId}</p>
          <p><b>User:</b> {r.userId}</p>
          <p><b>Rating:</b> {r.rating}/5</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

const style = { padding: 20 };
const card = {
  border: "1px solid #ccc",
  padding: 10,
  marginBottom: 10
};

export default Reviews;
