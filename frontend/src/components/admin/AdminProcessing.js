import React, { useEffect } from "react";
import { connect } from "react-redux";
import { verifyEmail } from "../../actions/userActions";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminProcessing = ({}) => {


  return (
    <div className="row justify-content-center">
      <div className="col-6 mt-5 text-center">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/verify.png"
          alt="Order Success"
          width="200"
          height="200"
          style={{
            animation: "fade-in 1s ease-in",
          }}
        />

        <h2>Your Account is still on process for verification please wait for activation.</h2>
      </div>
    </div>
  );
};

export default AdminProcessing;
