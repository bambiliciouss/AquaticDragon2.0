import React, { useState } from "react";
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

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");

  const saveDelivveryAddressToSessionStorage = () => {
    const pickupAddress = {
      address,
      streetName,
      barangay,
      city,
    };

    sessionStorage.setItem("deliveryAddress", JSON.stringify(pickupAddress));
  };

  const processToNextStep = () => {
    saveDelivveryAddressToSessionStorage();
    navigate("/payment");
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Delivery Address"} />

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
                <h3 className="mb-0">Delivery Address</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Street Name </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street Name"
                      onChange={(e) => setStreetName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Barangay</label>
                    <select
                      className="form-control"
                      id="barangaySelect"
                      value={barangay}
                      onChange={(e) => setBarangay(e.target.value)}>
                      <option value="" disabled>
                        Select Barangay
                      </option>
                      <option value="Central Bicutan">Central Bicutan</option>
                      <option value="Upper Bicutan">Upper Bicutan</option>
                      <option value="New Lower Bicutan">
                        New Lower Bicutan
                      </option>
                    </select>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">City</label>
                    <select
                      className="form-control"
                      id="citySelect"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}>
                      <option value="" disabled>
                        Select City
                      </option>
                      <option value="Taguig City">Taguig City</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
            </Form>

            <Button block color="info" onClick={processToNextStep}>
              Proceed to Next Step
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default DeliveryAddress;
