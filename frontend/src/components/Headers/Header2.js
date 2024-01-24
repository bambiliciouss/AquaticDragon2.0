/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../actions/userActions";
import { allGallons } from "../../actions/gallonActions";

const Header2 = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { gallons } = useSelector((state) => state.allGallons);
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  useEffect(() => {
    dispatch(allUsers());
    dispatch(allGallons());
    console.log("users", users.length);
    // console.log("gallons", gallons.length);
  }, [dispatch]);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body"></div>
        </Container>
      </div>
    </>
  );
};

export default Header2;
