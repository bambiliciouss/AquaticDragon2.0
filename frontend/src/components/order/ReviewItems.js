import React, { useState, useEffect } from "react";
import {
  CardTitle,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import StarRatings from "react-star-ratings";
import moment from "moment-timezone";
const ReviewItems = ({ comment, handleEdit, handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    if (comment) {
      console.log("comment", comment);
    }
  }, [comment]);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <CardTitle
          style={{ marginBottom: "5px", fontWeight: "bold" }}
        >{`${comment.userID.fname} ${comment.userID.lname}`}</CardTitle>
        <div className="d-flex align-items-center">
        <p style={{ marginBottom: "5px", fontSize: "14px", marginRight: '5px'}}>
          {moment(comment.createdAt)
            .tz("Asia/Manila")
            .format("YYYY-MM-DD HH:mm A")}
        </p>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle tag="span" data-toggle="dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleEdit(comment)}>
              Edit
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => handleDelete(comment)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
        
      </div>
      <div className="d-flex flex-column">
        <CardText style={{maxWidth: '400px'}}>{comment.comment}</CardText>
        <StarRatings
          rating={comment.rating}
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="#FFD700"
          numberOfStars={5}
        />
      </div>
    </div>
  );
};
export default ReviewItems;
