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

const ContainerStatus = () => {
  const navigate = useNavigate();
  const [selectedContainerStatus, setSelectedContainerStatus] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("processToStoreSelection");
    if (storedData) {
      const { containerStatus } = JSON.parse(storedData);
      setSelectedContainerStatus(containerStatus);
    }
  }, []);

  const processToContainerStatus = () => {
    const data = {
      containerStatus: selectedContainerStatus,
    };

    sessionStorage.setItem("processToContainerStatus", JSON.stringify(data));

    navigate("/orderclaimingmethod");
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
              {/* <FormGroup>
                <div>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="containerStatus"
                        value="Pickup"
                        onChange={() => setSelectedContainerStatus("Pickup")}
                        checked={selectedContainerStatus === "Pickup"}
                      />
                      Pickup
                    </label>
                  </FormGroup>
                  <FormGroup check>
                    <label className="form-check-label">
                      <Input
                        type="radio"
                        name="containerStatus"
                        value="WalkIn"
                        onChange={() => setSelectedContainerStatus("WalkIn")}
                        checked={selectedContainerStatus === "WalkIn"}
                      />
                      Walkin
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
                          name="containerStatus"
                          value="Pickup"
                          onChange={() => setSelectedContainerStatus("Pickup")}
                          checked={selectedContainerStatus === "Pickup"}
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
                          value="WalkIn"
                          onChange={() => setSelectedContainerStatus("WalkIn")}
                          checked={selectedContainerStatus === "WalkIn"}
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
            <Button block color="info" onClick={processToContainerStatus}>
              Next
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ContainerStatus;
