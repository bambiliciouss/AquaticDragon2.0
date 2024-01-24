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
    const data = {
      orderClaimingMethod: selectedOrderClaimingMethod,
    };

    sessionStorage.setItem(
      "processToOrderClaimingMethod",
      JSON.stringify(data)
    );

    navigate("/storeselection");
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
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Select Order Claiming Method</h3>
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
              </FormGroup>
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
