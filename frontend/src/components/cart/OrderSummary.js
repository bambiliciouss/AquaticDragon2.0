import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartActions";
import { createOrder, clearErrors } from "../../actions/orderActions";
const OrderSummary = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const [notes, setNotes] = useState();
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    notes,
  };

  const containerstatusinfo = JSON.parse(
    sessionStorage.getItem("processToContainerStatus")
  );
  if (containerstatusinfo) {
    order.containerStatus = containerstatusinfo.containerStatus;
  }

  const orderclaimingOptioninfo = JSON.parse(
    sessionStorage.getItem("processToOrderClaimingMethod")
  );
  if (orderclaimingOptioninfo) {
    order.orderclaimingOption = orderclaimingOptioninfo.orderClaimingMethod;
  }

  const storeBranchinfo = JSON.parse(sessionStorage.getItem("selectedStore"));
  if (storeBranchinfo) {
    order.storeBranch = [
      {
        store: storeBranchinfo._id,
        deliveryFee: storeBranchinfo.deliverFee,
      },
    ];
  }

  const paymentinfo = JSON.parse(sessionStorage.getItem("processToPayment"));
  if (paymentinfo) {
    order.paymentInfo = paymentinfo.paymentMethod;
  }

  order.deliveryAddress = [
    {
      houseNo: user.houseNo,
      streetName: user.streetName,
      purokNum: user.purokNum,
      barangay: user.barangay,
      city: user.city,
    },
  ];

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = parseFloat(storeBranchinfo.deliverFee);
  const totalPrice = itemsPrice + deliveryFee;

  order.totalPrice = totalPrice;

  const submitHandler = async (e) => {
    e.preventDefault();

    // document.querySelector("#pay_btn").disabled = true;
    // order.paymentInfo = {
    //   id: "pi_1DpdYh2eZvKYlo2CYIynhU32",
    //   status: "succeeded",
    // };

    dispatch(createOrder(order));
    console.log(order);

    dispatch(clearCart());
    sessionStorage.clear();
    localStorage.clear();

    navigate("/orders/me");
    window.location.reload();
  };
  return (
    <>
      <AuthNavbar />
      <MetaData title={"Order Summary"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Order Summary</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h2">
                      {" "}
                      <i className="ni ni-square-pin" /> Delivery Address
                    </CardTitle>
                    <CardText>
                      {user.houseNo}, {user.purokNum}, {user.streetName},{" "}
                      {user.barangay}, {user.city}`
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h2">
                      {" "}
                      <i className="ni ni-shop" /> Selected Store
                    </CardTitle>
                    <CardText>
                      <Row>
                        <Col sm="3">
                          <img
                            src={storeBranchinfo.storeImage.url}
                            alt={storeBranchinfo._id}
                            img
                            style={{ width: 70, height: 70 }}
                          />
                        </Col>
                        <Col sm="3">{storeBranchinfo.deliverFee}</Col>
                        <Col sm="4">{totalPrice}</Col>
                      </Row>
                    </CardText>
                  </Card>
                </Col>
              </Row>

              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h2">
                      {" "}
                      <i className="ni ni-cart" /> Order(s)
                    </CardTitle>
                    <CardText>
                      {" "}
                      {cartItems.map((item) => (
                        <Row>
                          <Col sm="5">{item.gallon}</Col>
                          <Col sm="3">{item.quantity}</Col>
                          <Col sm="4">{item.price}</Col>
                        </Row>
                      ))}
                    </CardText>
                  </Card>
                </Col>
              </Row>

              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Container Status:{" "}
                      </span>
                      {containerstatusinfo.containerStatus}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Order Claiming Method:{" "}
                      </span>{" "}
                      {orderclaimingOptioninfo.orderClaimingMethod}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Payment Method:
                      </span>{" "}
                      {paymentinfo.paymentMethod}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>Notes:</span>{" "}
                      <Input
                        placeholder="Add Notes here ..."
                        rows="3"
                        type="textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Button block color="info">
                Place Order
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default OrderSummary;
