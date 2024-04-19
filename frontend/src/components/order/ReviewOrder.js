import React, { useState,useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import StarRatings from "react-star-ratings";

function ReviewOrder({ onSubmit, order, values, commentID}) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!comment) newErrors.comment = "This field is required";
    if (!rating) newErrors.rating = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit({ comment, rating, order, commentID});
    }
  };
  useEffect(()=>{
    if (values){
        setComment(values.comment)
        setRating(values.rating)
    }
  },[values])
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="comment">Comment</Label>
        <Input
          id="comment"
          name="comment"
          type="text"
          value={ comment}
          invalid={!!errors.comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <FormFeedback>{errors.comment}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="rating">Rating</Label>
        <div className="d-flex flex-column">
          <Input
            id="rating"
            name="rating"
            type="hidden"
            value={rating}
            invalid={!!errors.rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <StarRatings
            rating={rating}
            starRatedColor="#FFD700"
            changeRating={setRating}
            numberOfStars={5}
            name="rating"
          />
          <FormFeedback>{errors.rating}</FormFeedback>
        </div>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default ReviewOrder;
