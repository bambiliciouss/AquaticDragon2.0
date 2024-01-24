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
              <FormGroup>
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
              </FormGroup>
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
