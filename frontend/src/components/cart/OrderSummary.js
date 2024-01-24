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

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
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

  const pickupAddressinfo = JSON.parse(sessionStorage.getItem("pickupAddress"));
  if (pickupAddressinfo) {
    order.pickupAddress = [
      {
        address: pickupAddressinfo.address,
        street: pickupAddressinfo.streetName,
        barangay: pickupAddressinfo.barangay,
        city: pickupAddressinfo.city,
      },
    ];
  }

  const deliveryAddressinfo = JSON.parse(
    sessionStorage.getItem("deliveryAddress")
  );
  if (deliveryAddressinfo) {
    order.deliveryAddress = [
      {
        address: deliveryAddressinfo.address,
        street: deliveryAddressinfo.streetName,
        barangay: deliveryAddressinfo.barangay,
        city: deliveryAddressinfo.city,
      },
    ];
  }

  const paymentinfo = JSON.parse(sessionStorage.getItem("processToPayment"));
  if (paymentinfo) {
    order.paymentInfo = paymentinfo.paymentMethod;
  }

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
    navigate("/my-profile");
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
              <FormGroup></FormGroup>
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
