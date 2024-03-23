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

const ContainerStatus = () => {
  const navigate = useNavigate();
  const [selectedContainerStatus, setSelectedContainerStatus] = useState("");
  const [selectedOrderClaimingMethod, setSelectedOrderClaimingMethod] =
    useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("processToContainerStatus");
    if (storedData) {
      const { containerStatus } = JSON.parse(storedData);
      setSelectedContainerStatus(containerStatus);
      // setSelectedOrderClaimingMethod(orderClaimingMethod);
    }

    const storedDataC = sessionStorage.getItem("processToOrderClaimingMethod");
    if (storedDataC) {
      const { orderClaimingMethod } = JSON.parse(storedDataC);
      setSelectedOrderClaimingMethod(orderClaimingMethod);
    }
  }, []);

  const processToContainerStatus = () => {
    if (!selectedContainerStatus) {
      swal("Please select a container status before proceeding!", "", "error");
      return; // Stop further execution
    }
    const data = {
      containerStatus: selectedContainerStatus,
    };
    sessionStorage.setItem("processToContainerStatus", JSON.stringify(data));
    //navigate("/orderclaimingmethod");

    if (!selectedOrderClaimingMethod) {
      swal(
        "Please select how will you claim your order before proceeding!",
        "",
        "error"
      );
      return;
    }
    const data2 = {
      orderClaimingMethod: selectedOrderClaimingMethod,
    };
    sessionStorage.setItem(
      "processToOrderClaimingMethod",
      JSON.stringify(data2)
    );
    navigate("/payment");
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Container Status"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <CheckoutSteps store gallon containerstatus />
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Select Container Status</h3>
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
                          name="containerStatus"
                          value="Pick Up"
                          onChange={() => setSelectedContainerStatus("Pick Up")}
                          checked={selectedContainerStatus === "Pick Up"}
                        />

                        <CardText>For Pick up</CardText>
                        <CardText
                          style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                          The rider will pick up your water container(s) at your
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
                          name="containerStatus"
                          value="Walk In"
                          onChange={() => setSelectedContainerStatus("Walk In")}
                          checked={selectedContainerStatus === "Walk In"}
                        />
                        <CardText>Walk In</CardText>
                        <CardText
                          style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                          You are the one to bring your water container(s) at
                          water station.
                        </CardText>
                      </label>
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
            </Form>
            <div style={{ marginBottom: "20px" }}></div>
            {/* <Button block color="info" onClick={processToContainerStatus}>
              Next
            </Button> */}
          </CardBody>
        </Card>

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
            </Form>

            <Button block color="info" onClick={processToContainerStatus}>
              Proceed to Store Selection
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ContainerStatus;
