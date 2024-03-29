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
  CardText,
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import swal from "sweetalert";
const Payment = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("processToPayment");
    if (storedData) {
      const { paymentMethod } = JSON.parse(storedData);
      setSelectedPaymentMethod(paymentMethod);
    }
  }, []);

  const processToNextStep = () => {
    if (!selectedPaymentMethod) {
      // Show SweetAlert message if no radio button is clicked

      swal("Please select payment method before proceeding!", "", "error");
      return; // Stop further execution
    }

    const data = {
      paymentMethod: selectedPaymentMethod,
    };

    sessionStorage.setItem("processToPayment", JSON.stringify(data));

    navigate("/ordersummary");
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Payment Method"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <CheckoutSteps store gallon containerstatus payment />
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Select Payment Method</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              {/* <FormGroup>
                <div>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value="GCash"
                        onChange={() => setSelectedPaymentMethod("GCash")}
                        checked={selectedPaymentMethod === "GCash"}
                      />
                      GCash
                    </label>
                  </FormGroup>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        onChange={() => setSelectedPaymentMethod("Cash")}
                        checked={selectedPaymentMethod === "Cash"}
                      />
                      Cash
                    </label>
                  </FormGroup>
                </div>
              </FormGroup> */}

              <Row>
                <Col sm="12">
                  <Card body>
                    <FormGroup check>
                      <label className="form-check-label">
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="GCash"
                          onChange={() => setSelectedPaymentMethod("GCash")}
                          checked={selectedPaymentMethod === "GCash"}
                        />

                        <CardText>Gcash</CardText>
                      </label>
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <FormGroup check>
                      <label className="form-check-label">
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="Cash"
                          onChange={() => setSelectedPaymentMethod("Cash")}
                          checked={selectedPaymentMethod === "Cash"}
                        />

                        <CardText>Cash on Delivery</CardText>
                      </label>
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>
            </Form>

            <Button block color="info" onClick={processToNextStep}>
              View Order Summary
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Payment;
