import React, { useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <AuthNavbar />
      <MetaData title={"My Profile"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link active" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <div className="text-center">
                          <img
                            className="avatar border-gray"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "40%",
                            }}
                            src={user && user.avatar && user.avatar.url}
                            alt="User"
                          />
                          <div className="button-container text-center">
                            <div className="btn-container d-block">
                              <button
                                className="btn btn-info btn-sm mb-2"
                                onClick={() => navigate("/me/update")}>
                                Edit Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="9">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name">
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                type="text"
                                value={user ? user.fname : ""}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name">
                                Last name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                type="text"
                                value={user ? user.lname : ""}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email">
                                Email address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                type="email"
                                value={user ? user.email : ""}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address">
                            Phone No.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            type="text"
                            value={user ? user.phone : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city">
                            House No.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            type="text"
                            placeholder={
                              user && user.houseNo !== ""
                                ? user.houseNo
                                : "Update..."
                            }
                            value={user ? user.houseNo : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country">
                            Purok No.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            type="text"
                            placeholder={
                              user && user.purokNum !== ""
                                ? user.purokNum
                                : "Update..."
                            }
                            value={user ? user.purokNum : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address">
                            Street Name.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            type="text"
                            placeholder={
                              user && user.streetName !== ""
                                ? user.streetName
                                : "Update..."
                            }
                            value={user ? user.streetName : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city">
                            Barangay
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            type="text"
                            placeholder={
                              user && user.barangay !== ""
                                ? user.barangay
                                : "Update..."
                            }
                            value={user ? user.barangay : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country">
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            type="text"
                            placeholder={
                              user && user.city !== "" ? user.city : "Update..."
                            }
                            value={user ? user.city : ""}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default Profile;
