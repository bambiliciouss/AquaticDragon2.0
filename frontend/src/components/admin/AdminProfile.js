import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Import the useForm hook

import { MDBDataTable } from "mdbreact";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  Input,
} from "reactstrap";

import MetaData from "components/layout/MetaData";
import Sidebar from "components/Sidebar/Sidebar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      <MetaData title={"Type of Gallon(s)"} />
      <Sidebar
        logo={{
          innerLink: "/",
          imgSrc: require("../../assets/img/brand/logo2.1.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header2 />
        <Container className="mt--7" fluid>
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
                              onClick={() => navigate("/admin/update")}>
                              Edit Profile
                            </button>
                          </div>
                          <div className="btn-container d-block">
                            <button
                              className="btn btn-info btn-sm mb-2"
                              onClick={() =>
                                navigate("/admin/password/update")
                              }>
                              Change Password
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

                      <Row>
                        <Col lg="12">
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
                <h6 className="heading-small text-muted mb-4">Addresses</h6>
              </Form>
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default AdminProfile;
