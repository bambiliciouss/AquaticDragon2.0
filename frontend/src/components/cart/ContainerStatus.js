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

  // const processToContainerStatus = () => {
  //   const data = {
  //     containerStatus: selectedContainerStatus,
  //   };

  //   sessionStorage.setItem("processToContainerStatus", JSON.stringify(data));

  //   navigate("/orderclaimingmethod");
  // };

  const processToContainerStatus = () => {
    if (!selectedContainerStatus) {
      // Show SweetAlert message if no radio button is clicked

      swal("Please select a container status before proceeding!", "", "error");
      return; // Stop further execution
    }

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
