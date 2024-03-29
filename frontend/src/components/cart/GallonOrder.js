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

import { addItemToCart, addProductToCart } from "../../actions/cartActions";

import CheckoutSteps from "./CheckoutSteps";
import { allProductList } from "../../actions/productActions";
const GallonOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { error, typeofGallon } = useSelector((state) => state.allTypesGallon);
  const { products } = useSelector((state) => state.allProducts);

  const [activeType, setActiveType] = useState(null);
  const storeBranchinfo = JSON.parse(sessionStorage.getItem("selectedStore"));
  const handleButtonClick = (type) => {
    setActiveType(type);
  };

  // useEffect(() => {
  //   // dispatch(allTypesGallon(storeBranchinfo.storebranch._id));

  //   console.log("ETO YUNG CLICKED", activeType);
  //   console.log(storeBranchinfo.storebranch._id);
  // }, [dispatch, activeType]);
  // console.log("results", typeofGallon);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const [quantity, setQuantity] = useState(1);

  const [isRefillSelected, setRefillSelected] = useState(false);
  const [isNewSelected, setNewSelected] = useState(false);
  const [stocks, setStocks] = useState();

  const refillgallon = () => {
    setRefillSelected(true);
    setNewSelected(false);
    dispatch(allTypesGallon(storeBranchinfo.storebranch._id));
  };

  const newgallon = () => {
    setRefillSelected(false);
    setNewSelected(true);
    dispatch(allProductList(storeBranchinfo.storebranch._id));
    console.log(products);
  };

  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity));
  };

  const addToCartProduct = (id) => {
    dispatch(addProductToCart(id, quantity));
  };

  const getTotalStocksForProduct = (product) => {
    let totalStocks = 0;
    product.stocks.forEach((stock) => {
      if (!stock.deleted) {
        totalStocks += stock.quantity;
      }
    });

    return totalStocks;
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
                      className="col-md-6"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      <Button
                        block
                        color={isRefillSelected ? "primary" : "light"}
                        onClick={() => refillgallon()}>
                        Refill
                      </Button>
                    </div>
                    <div
                      className="col-md-6"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      <Button
                        block
                        color={isNewSelected ? "primary" : "light"}
                        onClick={() => newgallon()}>
                        New Containers
                      </Button>
                    </div>
                  </div>
                  {isRefillSelected && (
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
                      </div>
                    </div>
                  )}

                  {isNewSelected && (
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}>
                        {products.map((productss) => (
                          <>
                            <Card
                              // key={gallonType._id}
                              style={{ width: "20rem", margin: "18px" }}>
                              <CardImg
                                alt="..."
                                src={productss.typesgallon.gallonImage.url}
                                top
                                style={{ width: "100%", height: "300px" }}
                              />
                              <CardBody>
                                <CardTitle className="text-center">
                                  {productss.typesgallon.typeofGallon}
                                </CardTitle>
                                <CardText className="text-center">
                                  {" "}
                                  Total Stocks:{" "}
                                  {getTotalStocksForProduct(productss)} pc(s)
                                </CardText>

                                <CardText className="text-center">
                                  ₱ {productss.price}.00
                                </CardText>
                                {getTotalStocksForProduct(productss) > 0 ? (
                                  <Button
                                    block
                                    color="primary"
                                    onClick={() =>
                                      addToCartProduct(productss._id)
                                    }>
                                    Add to Cart
                                  </Button>
                                ) : (
                                  <Button block color="danger" disabled>
                                    Out of Stock
                                  </Button>
                                )}
                              </CardBody>
                            </Card>
                            <div style={{ marginBottom: "20px" }}></div>
                          </>
                        ))}
                      </div>
                    </div>
                  )}
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
