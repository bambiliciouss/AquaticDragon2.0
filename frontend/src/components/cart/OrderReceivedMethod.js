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
import swal from "sweetalert";
import CheckoutSteps from "./CheckoutSteps";
const OrderReceivedMethod = () => {
  const navigate = useNavigate();
  const [selectedOrderClaimingMethod, setSelectedOrderClaimingMethod] =
    useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("processToStoreSelection");
    if (storedData) {
      const { orderClaimingMethod } = JSON.parse(storedData);
      setSelectedOrderClaimingMethod(orderClaimingMethod);
    }
  }, []);

  const processToOrderClaimingMethod = () => {

    if (!selectedOrderClaimingMethod) {
      // Show SweetAlert message if no radio button is clicked

      swal("Please select how will you claim your order before proceeding!", "", "error");
      return; // Stop further execution
    }


    const data = {
      orderClaimingMethod: selectedOrderClaimingMethod,
    };

    sessionStorage.setItem(
      "processToOrderClaimingMethod",
      JSON.stringify(data)
    );

    navigate("/payment");
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Order Claiming Method"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
            <CheckoutSteps store containerstatus orderclaimingmethod/>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">How will you claim your order?</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col sm="12">
                  <Card body>
                    <FormGroup check>
                      <label className="form-check-label">
                        <Input
                          type="radio"
                          name="orderClaimingMethod"
                          value="Delivery"
                          onChange={() =>
                            setSelectedOrderClaimingMethod("Delivery")
                          }
                          checked={selectedOrderClaimingMethod === "Delivery"}
                        />
                       
                        <CardText>Delivery</CardText>
                        <CardText
                          style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                          The rider will deliver your water container(s) at your
                          address.
                        </CardText>
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
                        name="orderClaimingMethod"
                        value="Walk In"
                        onChange={() =>
                          setSelectedOrderClaimingMethod("Walk In")
                        }
                        checked={selectedOrderClaimingMethod === "Walk In"}
                      />
                       
                        <CardText>Walk In</CardText>
                        <CardText
                          style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                          You are the one to claim your water container(s) at
                          water station.
                        </CardText>
                      </label>
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              
              {/* <FormGroup>
                <div>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="orderClaimingMethod"
                        value="Delivery"
                        onChange={() =>
                          setSelectedOrderClaimingMethod("Delivery")
                        }
                        checked={selectedOrderClaimingMethod === "Delivery"}
                      />
                      Delivery
                    </label>
                  </FormGroup>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="orderClaimingMethod"
                        value="Walkin"
                        onChange={() =>
                          setSelectedOrderClaimingMethod("Walkin")
                        }
                        checked={selectedOrderClaimingMethod === "Walkin"}
                      />
                      Walkin
                    </label>
                  </FormGroup>
                </div>
              </FormGroup> */}
            </Form>

            <Button block color="info" onClick={processToOrderClaimingMethod}>
              Proceed to Store Selection
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default OrderReceivedMethod;
