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
    //console.log(user)
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    notes,
    user,
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
        branchNo: storeBranchinfo.branch,
        address: `${storeBranchinfo.address.houseNo}, ${storeBranchinfo.address.purokNum}, ${storeBranchinfo.address.streetName}, ${storeBranchinfo.address.barangay}, ${storeBranchinfo.address.city}  `,
        deliveryFee: storeBranchinfo.deliverFee,
      },
    ];
  }

  const paymentinfo = JSON.parse(sessionStorage.getItem("processToPayment"));
  if (paymentinfo) {
    order.paymentInfo = paymentinfo.paymentMethod;
  }

  const defaultAddress =
    user?.addresses?.find((address) => address.isDefault) || {};

  order.deliveryAddress = [
    {
      houseNo: defaultAddress.houseNo,
      streetName: defaultAddress.streetName,
      purokNum: defaultAddress.purokNum,
      barangay: defaultAddress.barangay,
      city: defaultAddress.city,
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
                      {defaultAddress.houseNo} {defaultAddress.purokNum}{" "}
                      {defaultAddress.streetName} {defaultAddress.barangay}{" "}
                      {defaultAddress.city}
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
                          <Col sm="5">
                            {/* <div style={{ textAlign: "center" }}>
                              <img
                                src={item.image}
                                alt={item.image}
                                style={{
                                  width: 100,
                                  height: 100,
                                  display: "inline-block",
                                }}
                              />
                            </div> */}
                            {item.type}
                          </Col>
                          <Col sm="3" style={{ textAlign: "center" }}>
                            {item.quantity} pc
                          </Col>

                          <Col sm="4" style={{ textAlign: "right" }}>
                            ₱{item.price}.00
                          </Col>
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
                    <CardTitle tag="h2">
                      {" "}
                      <i className="ni ni-shop" /> Selected Store
                    </CardTitle>
                    <CardText>
                      <Row>
                        <Col sm="8">
                          {storeBranchinfo.address.houseNo}{" "}
                          {storeBranchinfo.address.purokNum},
                          {storeBranchinfo.address.streetName}
                          {storeBranchinfo.address.barangay}{" "}
                          {storeBranchinfo.address.city}{" "}
                        </Col>
                        <Col sm="4" style={{ textAlign: "right" }}>
                          {" "}
                          Shipping Fee: ₱ {storeBranchinfo.deliverFee}.00
                        </Col>
                      </Row>
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
              <Row>
                <Col sm="12">
                  <CardText style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold" }}>Order Total:</span> ₱
                    {totalPrice}.00
                  </CardText>
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
