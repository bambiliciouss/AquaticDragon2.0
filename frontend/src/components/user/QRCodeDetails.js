import React, { useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { getUserQRDetails } from "actions/userActions";
import { AdminallAddress } from "actions/addressAction";
const QRCodeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  let navigate = useNavigate();
  let location = useLocation();

  const { useraddress } = useSelector((state) => state.allAddress);

  const { user } = useSelector((state) => state.userDetails);
  React.useEffect(() => {
    dispatch(getUserQRDetails(id));
    dispatch(AdminallAddress(id));
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const defaultAddress =
    user?.addresses?.find((address) => address.isDefault) || {};

  console.log("info", defaultAddress);
  return (
    <>
      <MetaData title={"QR Code Details"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <div className="row">
          {/* Sidebar */}

          <div className="col-md-12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Customer Details</h3>
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
                              width: "180px",
                              height: "180px",
                              borderRadius: "30%",
                            }}
                            src={user.avatar && user.avatar.url}
                            alt="User"
                          />
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
                              defaultAddress && defaultAddress.houseNo !== ""
                                ? defaultAddress.houseNo
                                : "Update..."
                            }
                            value={defaultAddress ? defaultAddress.houseNo : ""}
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
                              defaultAddress && defaultAddress.purokNum !== ""
                                ? defaultAddress.purokNum
                                : "Update..."
                            }
                            value={
                              defaultAddress ? defaultAddress.purokNum : ""
                            }
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
                              defaultAddress && defaultAddress.streetName !== ""
                                ? defaultAddress.streetName
                                : "Update..."
                            }
                            value={
                              defaultAddress ? defaultAddress.streetName : ""
                            }
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
                              defaultAddress && defaultAddress.barangay !== ""
                                ? defaultAddress.barangay
                                : "Update..."
                            }
                            value={
                              defaultAddress ? defaultAddress.barangay : ""
                            }
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
                              defaultAddress && defaultAddress.city !== ""
                                ? defaultAddress.city
                                : "Update..."
                            }
                            value={defaultAddress ? defaultAddress.city : ""}
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
    </>
  );
};

export default QRCodeDetails;
