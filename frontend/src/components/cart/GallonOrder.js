import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { useDispatch, useSelector } from "react-redux";
import { allTypesGallon } from "actions/typesgallonAction";
import MetaData from "components/layout/MetaData";

import { addItemToCart } from "../../actions/cartActions";

import CheckoutSteps from "./CheckoutSteps";
const GallonOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { error, typeofGallon } = useSelector((state) => state.allTypesGallon);
  const [activeType, setActiveType] = useState(null);
  const storeBranchinfo = JSON.parse(sessionStorage.getItem("selectedStore"));
  const handleButtonClick = (type) => {
    setActiveType(type);
  };

  useEffect(() => {
    dispatch(allTypesGallon(storeBranchinfo.storebranch._id));

    console.log("ETO YUNG CLICKED", activeType);
    console.log(storeBranchinfo.storebranch._id);
  }, [dispatch, activeType]);
  console.log("results", typeofGallon);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const [quantity, setQuantity] = useState(1);
  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity));
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Gallon(s)"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
   
   <CheckoutSteps store gallon />
        <div className="row">
          <div className="col-md-12">
            <div className="user-profile">
              <div className="wrapper ">
                <div className="content">
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      {typeofGallon.map((gallonType) => (
                        <>
                          <Card
                            // key={gallonType._id}
                            style={{ width: "20rem", margin: "18px" }}>
                            <CardImg
                              alt="..."
                              src={gallonType.gallonImage.url}
                              top
                              style={{ width: "100%", height: "300px" }}
                            />
                            <CardBody>
                              <CardTitle className="text-center">
                                {gallonType.typeofGallon}
                              </CardTitle>
                              <CardText className="text-center">
                                ₱ {gallonType.price}.00
                              </CardText>
                              <Button
                                block
                                color="primary"
                                onClick={() => addToCart(gallonType._id)}>
                                Add to Cart
                              </Button>
                            </CardBody>
                          </Card>
                          <div style={{ marginBottom: "20px" }}></div>
                        </>
                      ))}

                      {/* {typeofGallon.map((gallonType) => (
                        <Fragment key={gallonType?._id}>
                          <Card style={{ width: "20rem", margin: "18px" }}>
                            <CardImg
                              alt="..."
                              src={require("assets/img/landingpage-img2.jpg")}
                              top
                            />
                            <CardBody>
                              <CardTitle className="text-center">
                                {gallonType?.typeofGallon}
                              </CardTitle>
                              <CardText className="text-center">
                                ₱ {gallonType?.price}.00
                              </CardText>
                              <Button
                                block
                                color="primary"
                                onClick={() => addToCart(gallonType?._id)}>
                                Add to Cart
                              </Button>
                            </CardBody>
                          </Card>
                          <div style={{ marginBottom: "20px" }}></div>
                        </Fragment>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GallonOrder;
